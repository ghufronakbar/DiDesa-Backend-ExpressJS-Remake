const express = require("express");
const router = express.Router();
const prisma = require("../db/prisma");
const Parser = require("rss-parser");
const axios = require("axios");
const cheerio = require("cheerio");

const parser = new Parser();

// helper: concurrency pool
async function asyncPool(poolLimit, array, iteratorFn) {
  const ret = [];
  const executing = new Set();
  for (const item of array) {
    const p = Promise.resolve().then(() => iteratorFn(item));
    ret.push(p);

    executing.add(p);
    const clean = () => executing.delete(p);
    p.then(clean).catch(clean);

    if (executing.size >= poolLimit) {
      // wait for any to finish
      await Promise.race(executing);
    }
  }
  return Promise.all(ret);
}

// helper: chunk array
const chunk = (arr, size = 100) => {
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
};

// fetch RSS with axios + parser.parseString so we can set timeout
const fetchAndParseRss = async (url, timeoutMs = 10000) => {
  try {
    const resp = await axios.get(url, {
      timeout: timeoutMs,
      responseType: "text",
    });
    return parser.parseString(resp.data);
  } catch (err) {
    throw new Error(`⏰ Timeout/Fetch failed for RSS ${url}: ${err.message}`);
  }
};

router.get("/", async (req, res) => {
  try {
    const rsses = await prisma.rss.findMany();

    // concurrency limits (tweak these based on environment)
    const FEED_CONCURRENCY = 5; // how many feeds to fetch in parallel
    const ITEM_CONCURRENCY = 6; // how many article full-content fetches in parallel
    const DB_BATCH_SIZE = 200; // how many items to insert per createMany call

    // process each rss feed with limited concurrency
    const results = await asyncPool(FEED_CONCURRENCY, rsses, async (rss) => {
      try {
        if (!rss?.url) {
          console.log(`Skipping RSS without url: ${rss.title}`);
          return { rss, imported: 0, error: null };
        }

        const feed = await fetchAndParseRss(rss.url, 10000);

        if (!feed?.items?.length) {
          console.log(`${rss.title} tidak ada berita baru`);
          return { rss, imported: 0 };
        }

        if (rss.publisher === "cnbc") {
          // map synchronously (no network per item)
          const mapped = feed.items.map(mapCnbcToBerita).filter(Boolean);

          if (mapped.length === 0) {
            console.log(`${rss.title} tidak ada berita baru (mapped empty)`);
            return { rss, imported: 0 };
          }

          // insert in batches
          let totalCreated = 0;
          for (const batch of chunk(mapped, DB_BATCH_SIZE)) {
            const created = await prisma.berita.createMany({
              skipDuplicates: true,
              data: { ...batch, publikasi: true },
            });
            totalCreated += created.count || 0;
          }
          console.log(`${rss.title} berhasil diimport ${totalCreated} berita`);
          return { rss, imported: totalCreated };
        }

        if (rss.publisher === "antara") {
          // for antara we need to fetch full content per item (network). do with concurrency.
          const items = feed.items || [];

          const mappedPromises = await asyncPool(
            ITEM_CONCURRENCY,
            items,
            async (item) => {
              try {
                return await mapAntaraToBerita(item);
              } catch (err) {
                console.warn(
                  `Mapping failed for item ${item?.title}: ${err.message}`
                );
                return null;
              }
            }
          );

          const mapped = (mappedPromises || []).filter(Boolean);

          if (mapped.length === 0) {
            console.log(`${rss.title} tidak ada berita baru (mapped empty)`);
            return { rss, imported: 0 };
          }

          let totalCreated = 0;
          for (const batch of chunk(mapped, DB_BATCH_SIZE)) {
            const created = await prisma.berita.createMany({
              skipDuplicates: true,
              data: { ...batch, publikasi: true },
            });
            totalCreated += created.count || 0;
          }
          console.log(`${rss.title} berhasil diimport ${totalCreated} berita`);
          return { rss, imported: totalCreated };
        }

        // other publishers (default): attempt simple mapping
        console.log(`Publisher ${rss.publisher} belum di-handle khusus.`);
        return { rss, imported: 0 };
      } catch (err) {
        console.error(
          `Error processing feed ${rss.title}:`,
          err.message || err
        );
        return { rss, imported: 0, error: err.message };
      }
    });

    // summarise
    const totalImported = results.reduce((s, r) => s + (r.imported || 0), 0);
    return res
      .status(200)
      .json({ status: 200, message: "Done", totalImported });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ status: 500, message: "Internal Server Error" });
  }
});

// CNBC mapper (unchanged)
const mapCnbcToBerita = (item) => {
  if (!item?.guid || !item?.title || !item.content) return null;
  const code = `cnbc-${item?.guid}`;
  return {
    judul: item?.title || "",
    subjudul: item?.contentSnippet || "",
    tanggal: new Date(item?.isoDate || new Date()),
    isi: item?.content || "",
    gambar: item?.enclosure?.url || item?.thumbnail || item?.image || null,
    rssCode: code,
  };
};

// ANTARA mapper (optimized: avoid failing the whole job)
const mapAntaraToBerita = async (item) => {
  if (!item?.guid || !item?.title) return null;

  let imageUrl = null;

  if (item.enclosure?.url) {
    imageUrl = item.enclosure.url;
  } else if (item["content:encoded"]) {
    const match = item["content:encoded"].match(
      /<img[^>]+src=["']([^"']+)["']/
    );
    if (match?.[1]) {
      imageUrl = match[1];
    }
  }

  // fetch full content with timeout and safe fallback
  const fullContent = await fullContentAntara(item.link, 8000).catch(() => "");

  const code = `antara-${item?.guid}`;
  return {
    judul: item?.title || "",
    subjudul: item?.contentSnippet || "",
    tanggal: new Date(item?.isoDate || new Date()),
    isi: fullContent || item.content || item.contentSnippet || "",
    gambar: imageUrl || null,
    rssCode: code,
  };
};

const fullContentAntara = async (url, timeoutMs = 8000) => {
  if (!url) return "";
  try {
    const res = await axios.get(url, {
      timeout: timeoutMs,
      responseType: "text",
    });
    const $ = cheerio.load(res.data);

    const paragraphs = [];

    $(".post-content p").each((_, el) => {
      const text = $(el).text().trim();

      const isGarbage =
        text.includes("(adsbygoogle") ||
        text.toLowerCase().includes("copyright") ||
        text.toLowerCase().includes("dilarang keras") ||
        text.toLowerCase().startsWith("pewarta:") ||
        text.toLowerCase().startsWith("editor:");

      if (text && !isGarbage) {
        paragraphs.push(text);
      }
    });

    return paragraphs.join("\n\n");
  } catch (err) {
    // swalllow errors and return empty so mapping can continue
    console.warn(`Failed to fetch full content for ${url}: ${err.message}`);
    return "";
  }
};

module.exports = router;
