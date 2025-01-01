const prisma = require('../src/db/prisma')


async function main() {
    const warga = await prisma.warga.findMany({ where: { NOT: { wargaId: 0 } } })
    const jenisUmkmMakanan = await prisma.jenisUmkm.findFirst({ where: { namaJenisUmkm: "Makanan" } })
    const wargaId = () => warga[Math.floor(Math.random() * warga.length)].wargaId
    
    const dataUmkm = [
        {
            nama: "Pempek 77 Palembang",
            gambar: "/image.png",
            jenisUmkmId: jenisUmkmMakanan.jenisUmkmId,
            lokasi: "Jl. Mataram No.28, Rejowinangun Utara, Kec. Magelang Tengah, Kota Magelang, Jawa Tengah 56214",
            latitude: -7.478299202671914,
            longitude: 110.21972251500817,
            wargaId: wargaId(),
            deskripsi: "BARU DI JALAN IKHLAS, SPOT JAJAN PEMPEK 77 LEGEND PELOPOR PEMPEK PALEMBANG DI MAGELANG, CUKO RACIK SENDIRI MANIS & PEDAS 😍🤩",
            approve: true,
            status: true,
        },
        {
            nama: "Koki Kita",
            gambar: "/image.png",
            jenisUmkmId: jenisUmkmMakanan.jenisUmkmId,
            lokasi: "Jl. Pahlawan No.125, Potrobangsan, Kec. Magelang Utara, Kota Magelang, Jawa Tengah 56116",
            latitude: -7.452752960084105,
            longitude: 110.22143887158512,
            wargaId: wargaId(),
            deskripsi: "Rayakan setiap momen istimewa dengan nasi kotak dari Koki Kita!\n\n📦 Pilihan menu variatif, harga ramah kantong, dan kualitas terbaik.\n\nPesan sekarang untuk berbagai acara spesial Anda!",
            approve: true,
            status: true,
        },
        {
            nama: "Nyokelat",
            gambar: "/image.png",
            jenisUmkmId: jenisUmkmMakanan.jenisUmkmId,
            lokasi: "C75H+59M, Gn. Pring, Gunungpring, Kec. Muntilan, Kabupaten Magelang, Jawa Tengah 56415",
            latitude: -7.536813890235534,
            longitude: 110.16616365214078,
            deskripsi: "Cokelat lembut dan empuk yang langsung melted di mulut dengan rasa Salted Caramel yang enak banget ada sensasi caramel dan guruh dr seasaltnya dan dicover dengan bittersweet dari cocoa powder",
            wargaId: wargaId(),
            approve: true,
            status: true,
        },
        {
            nama: "Toko Kue Maher",
            gambar: "/image.png",
            jenisUmkmId: jenisUmkmMakanan.jenisUmkmId,
            lokasi: "Krombangan, Sanggaran, Donorojo, Kec. Mertoyudan, Kabupaten Magelang, Jawa Tengah 56172",
            latitude: -7.559288245885016,
            longitude: 110.21044226888604,
            deskripsi: "Maher snack cookies n tart Maher\nTerima pesanan kue ulang tahun",
            wargaId: wargaId(),
            approve: true,
            status: true,
        }
    ]
    for (const umkm of dataUmkm) {
        const check = await prisma.umkm.findFirst({ where: { nama: umkm.nama } })
        if (!check) {
            try {
                await prisma.umkm.create({ data: umkm })
                console.log(`Umkm ${umkm.nama} berhasil dibuat`);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log(`Umkm ${umkm.nama} sudah ada`);
        }
    }
}

main()