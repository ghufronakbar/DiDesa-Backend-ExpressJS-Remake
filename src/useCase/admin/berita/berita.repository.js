const prisma = require('../../../db/prisma')

const getAllBerita = async (page) => {
    const berita = await prisma.berita.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            beritaId: 'desc'
        }
    })
    return berita
}

const countBerita = async () => {
    const berita = await prisma.berita.count()
    return berita
}

const getBeritaById = async (beritaId) => {
    const berita = await prisma.berita.findFirst({
        where: {
            beritaId
        }, include: {
            komentar: true
        }
    })
    return berita
}

const createBerita = async (judul, isi, subjudul, gambar) => {
    const berita = await prisma.berita.create({
        data: {
            judul,
            isi,
            subjudul,
            gambar,
        }
    })
    return berita
}

const updateBerita = async (beritaId, data) => {
    const berita = await prisma.berita.update({
        where: {
            beritaId
        },
        data
    })
    return berita
}

const deleteBerita = async (beritaId) => {
    const berita = await prisma.berita.delete({
        where: {
            beritaId
        }
    })
    return berita
}

const publikasiBerita = async (beritaId, publikasi) => {
    const berita = await prisma.berita.update({
        where: {
            beritaId
        },
        data: {
            publikasi
        }
    })
    return berita
}

const prioritasBerita = async (beritaId, prioritas) => {
    const berita = await prisma.berita.update({
        where: {
            beritaId
        },
        data: {
            prioritas
        }
    })
    return berita
}

module.exports = { getAllBerita, getBeritaById, createBerita, updateBerita, deleteBerita, publikasiBerita, prioritasBerita, countBerita }