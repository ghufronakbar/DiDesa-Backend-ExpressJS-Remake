const prisma = require('../../../db/prisma')

const createKomentar = async (isi, beritaId, wargaId) => {
    const newKomentar = await prisma.komentar.create({
        data: {
            isi,
            beritaId,
            wargaId
        }
    })
    return newKomentar
}

const getKomentarById = async (komentarId, wargaId) => {
    const komentar = await prisma.komentar.findFirst({
        where: {
            komentarId,
            wargaId
        }
    })
    return komentar
}

const deleteKomentar = async (komentarId) => {
    const deleteKomentar = await prisma.komentar.delete({
        where: {
            komentarId
        }
    })
    return deleteKomentar
}

const getBeritaById = async (beritaId) => {
    const berita = await prisma.berita.findFirst({
        where: {
            beritaId
        }
    })
    return berita
}

module.exports = { createKomentar, deleteKomentar, getKomentarById, getBeritaById }