const prisma = require('../../../db/prisma')

const createPengaduan = async (data) => {
    const newPengaduan = await prisma.pengaduanMasyarakat.create({
        data
    })
    return newPengaduan
}

const getAllPengaduan = async (wargaId) => {
    const pengaduan = await prisma.pengaduanMasyarakat.findMany({
        where: {
            wargaId
        },
        orderBy: {
            tanggal: 'desc'
        }
    })
    return pengaduan
}

const getPengaduanById = async (pengaduanMasyarakatId) => {
    const pengaduan = await prisma.pengaduanMasyarakat.findFirst({
        where: {
            pengaduanMasyarakatId
        }
    })
    return pengaduan
}

const deletePengaduan = async (pengaduanMasyarakatId) => {
    const deletePengaduan = await prisma.pengaduanMasyarakat.delete({
        where: {
            pengaduanMasyarakatId
        }
    })
    return deletePengaduan
}

module.exports = { createPengaduan, getAllPengaduan, getPengaduanById, deletePengaduan }