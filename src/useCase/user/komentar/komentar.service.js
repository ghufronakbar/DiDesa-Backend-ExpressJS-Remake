const prohibitedWords = require('../../../helper/prohibitedWords')
const isProhibited = require('../../../utils/isProhibited')
const { createKomentar, deleteKomentar, getKomentarById, getBeritaById } = require('./komentar.repository')

const createKomentarService = async (isi, beritaId, wargaId) => {
    if (isi.length > 200) {
        return new Error('Komentar Terlalu Panjang')
    }
    const checkBerita = await getBeritaById(Number(beritaId))
    if (!checkBerita) {
        return new Error('Berita Tidak Ditemukan')
    }
    const checkWords = await isProhibited(isi, prohibitedWords)
    if (checkWords === true) {
        return new Error('Komentar Mengandung Kata Tidak Pantas')
    }
    const komentar = await createKomentar(isi, Number(beritaId), Number(wargaId))
    return komentar
}

const deleteKomentarService = async (komentarId, wargaId) => {
    const check = await getKomentarById(Number(komentarId))
    if (!check) {
        return new Error('Komentar Tidak Ditemukan')
    }
    if (check.wargaId !== Number(wargaId)) {
        return new Error('Komentar Tidak Bisa Dihapus')
    }
    const delKom = await deleteKomentar(Number(komentarId))
    return delKom
}

module.exports = { createKomentarService, deleteKomentarService }