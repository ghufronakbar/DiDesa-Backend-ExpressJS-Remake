const prisma = require('../src/db/prisma')

const checkGuest = async () => {
    const check = await prisma.warga.findFirst({ where: { wargaId: 0 } })
    if(!check) {
        return true
    } else {
        return false
    }
}

const createGuest = async () => {
    const guest = await prisma.warga.create({
        data: {
            wargaId: 0,
            kk: "Guest",
            nik: "Guest",
            namaLengkap: "Guest",
            password: "Guest",
            tanggalLahir: new Date(),
            telepon: "Guest",
        }
    })
}

module.exports = { checkGuest, createGuest }