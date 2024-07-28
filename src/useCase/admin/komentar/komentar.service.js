const { getAllKomentar, deleteKomentar, getKomentarById, countKomentar } = require('./komentar.repository')

const getAllKomentarService = async (page) => {
    const komentar = await getAllKomentar(page)
    const count = await countKomentar()
    return { komentar, count }
}

const getKomentarByIdService = async (komentarId) => {
    const komentar = await getKomentarById(komentarId)
    if (!komentar) {
        return new Error('Komentar tidak ditemukan')
    }
    return komentar
}

const deleteKomentarService = async (komentarId) => {
    const komentarCheck = await getKomentarById(komentarId)
    if (!komentarCheck) {
        return new Error('Komentar tidak ditemukan')
    }
    const komentar = await deleteKomentar(komentarId)
    return komentar
}

module.exports = { getAllKomentarService, deleteKomentarService, getKomentarByIdService }