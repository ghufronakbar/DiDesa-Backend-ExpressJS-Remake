const prisma = require('../src/db/prisma')

const checkPengurus = async () => {
    const pengurus = await prisma.pengurusDesaAnggota.findMany()
    if (pengurus.length === 0) {
        return true
    } else {
        return false
    }
}


const createPengurus = async (wargaId) => {
    const pengurus = await prisma.pengurusDesaAnggota.create({
        data: {
            wargaId,
            jabatan: "Administrator",
            aksesAdmin: true,
        }
    })
}

module.exports = { checkPengurus, createPengurus }