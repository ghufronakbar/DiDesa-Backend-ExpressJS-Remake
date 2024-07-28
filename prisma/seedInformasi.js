const prisma = require('../src/db/prisma')

const checkInformasi = async () => {
    const informasi = await prisma.informasiDesa.findMany()
    if (informasi.length === 0) {
        return true
    } else {
        return false
    }
}


const createInformasi = async () => {
    const informasi = await prisma.informasiDesa.create({
        data: {
            namaDesa: "Didesa",
            deskripsi: "Desa Donorojo merupakan salah satu dari 13 Desa yang ada di Kecamatan Mertoyudan, Kabupaten Magelang, Jawa Tengah. Secara administrasi Desa Donorojo terletak pada koordinat antara 110°21,5 dan 110°57,5",
            lahanPeternakan: 124,
            lahanPertanian: 35,
        }
    })
}


module.exports = { checkInformasi, createInformasi }