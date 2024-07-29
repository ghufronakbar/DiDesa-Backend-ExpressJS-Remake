const prisma = require('../src/db/prisma')

const jenisUmkmData = [
    "Makanan",
    "Minuman",
    "Kerajinan",
    "Fashion",
    "Tekstil",
    "Kuliner",
    "Pertanian",
    "Perikanan",
    "Peternakan",
    "Teknologi",
    "Pendidikan",
    "Pariwisata",
    "Jasa",
    "Otomotif",
    "Elektronik",
    "Kosmetik",
    "Kesehatan",
    "Furnitur",
    "Mainan",
    "Desain",
    "Perdagangan",
    "Periklanan",
    "Hiburan",
    "Media",
    "Keuangan",
    "Properti",
    "Energi",
    "Transportasi",
    "Logistik",
    "Telekomunikasi"
]

const checkJenisUmkm = async () => {
    const count = await prisma.jenisUmkm.count()
    return count === 0
}

const createJenisUmkm = async () => {
    for (const namaJenis of jenisUmkmData) {
        await prisma.jenisUmkm.create({
            data: { namaJenisUmkm: namaJenis }
        })
    }
    console.log("JenisUmkm created")
}



module.exports = { checkJenisUmkm, createJenisUmkm }
