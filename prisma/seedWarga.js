const prisma = require("../src/db/prisma");
const bcrypt = require("bcrypt");

const checkWarga = async () => {
  const warga = await prisma.warga.findMany({ where: { NOT: { wargaId: 0 } } });
  if (warga.length === 0) {
    return true;
  } else {
    return false;
  }
};

const createWarga = async () => {
  const password = await bcrypt.hash("12345678", 10);
  const warga = await prisma.warga.create({
    data: {
      nik: "5210411243",
      namaLengkap: "Ghufron Akbar Maulana",
      kk: "12345678",
      tanggalLahir: "2004-02-19T00:00:00.000Z",
      password,
    },
  });
  return warga.wargaId;
};

const createWargaCalonKetua = async () => {
  const password = await bcrypt.hash("12345678", 10);

  const checkCalon1 = await prisma.warga.findFirst({
    where: { nik: "3308111507680001" },
  });
  const checkCalon2 = await prisma.warga.findFirst({
    where: { nik: "3308115204750002" },
  });

  if (checkCalon1 && checkCalon2) {
    console.log("Calon ketua sudah ada.");
    return;
  }

  const calon1 = await prisma.warga.create({
    data: {
      nik: "3308111507680001",
      namaLengkap: "Bapak Drs. H. Sutrisno, M.Pd.",
      kk: "3308111507680001",
      tanggalLahir: "1968-07-15T00:00:00.000Z",
      rw: "002",
      password,
      foto: "https://res.cloudinary.com/dga0wmldp/image/upload/v1763202321/professional-man-portrait_a8w3vj.png",
      telepon: "081234567890",
    },
  });

  const calon2 = await prisma.warga.create({
    data: {
      nik: "3308115204750002",
      namaLengkap: "Ibu Hj. Indah Purnamasari, S.E.",
      kk: "3308115204750002",
      tanggalLahir: "1975-04-22T00:00:00.000Z",
      rw: "002",
      password,
      foto: "https://res.cloudinary.com/dga0wmldp/image/upload/v1763202321/professional-woman-portrait_v2k3x4.png",
      telepon: "087654321098",
    },
  });

  await prisma.pemilihanKetua.create({
    data: {
      tanggalMulai: new Date("2026-03-01T00:00:00.000Z"),
      tanggalSelesai: new Date("2026-03-15T23:59:59.000Z"),
      judul: "Pemilihan Ketua RW 002 Periode 2026-2029",
      deskripsi: "Mari bersama-sama menyukseskan pesta demokrasi tingkat RW. Gunakan hak pilih Anda untuk menentukan pemimpin yang akan membawa kemajuan bagi lingkungan kita. Satu suara Anda menentukan masa depan RW 002 yang lebih baik.",
      rw: "002",
      calonKetua: {
        createMany: {
          data: [
            {
              wargaId: calon1.wargaId,
              deskripsi: `**Visi:** "Mewujudkan RW 002 yang Aman, Sejahtera, dan Berbudaya melalui Gotong Royong."\n\n**Misi:**\n1. Meningkatkan keamanan lingkungan melalui program siskamling yang proaktif dan terintegrasi.\n2. Mengembangkan potensi UMKM warga dengan mengadakan pelatihan dan membuka akses pasar.\n3. Melestarikan kegiatan budaya dan keagamaan sebagai sarana mempererat tali silaturahmi antarwarga.\n4. Mengoptimalkan pengelolaan sampah dan program kebersihan lingkungan secara berkelanjutan.`,
            },
            {
              wargaId: calon2.wargaId,
              deskripsi: `**Visi:** "Menjadikan RW 002 sebagai Lingkungan yang Modern, Kreatif, dan Inklusif untuk Semua Generasi."\n\n**Misi:**\n1. Digitalisasi layanan administrasi RW untuk kemudahan dan transparansi.\n2. Menciptakan ruang kreatif dan kegiatan positif bagi pemuda dan anak-anak.\n3. Mengadakan program pelatihan keterampilan (skill-up) untuk ibu-ibu dan remaja putri.\n4. Menjamin transparansi pengelolaan dana kas RW melalui publikasi digital secara berkala.`,
            },
          ],
        },
      },
    },
  });
  console.log("Data pemilihan ketua berhasil dibuat.");
};

module.exports = { checkWarga, createWarga, createWargaCalonKetua };
