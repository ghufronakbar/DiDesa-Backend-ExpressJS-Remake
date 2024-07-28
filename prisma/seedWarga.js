const prisma = require('../src/db/prisma')
const bcrypt = require('bcrypt')

const checkWarga = async () => {
    const warga = await prisma.warga.findMany({ where: { NOT: { wargaId: 0 } } })
    if (warga.length === 0) {
        return true
    } else {
        return false
    }
}

const createWarga = async () => {
    const password = await bcrypt.hash("12345678", 10)
    const warga = await prisma.warga.create({
        data: {
            nik: "5210411243",
            namaLengkap: "Ghufron Akbar Maulana",
            kk: "12345678",
            tanggalLahir: "2004-02-19T00:00:00.000Z",
            password
        }
    })
    return warga.wargaId
}


module.exports = { checkWarga, createWarga }