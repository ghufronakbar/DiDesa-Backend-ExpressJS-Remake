const prohibitedWords = require('../../../helper/prohibitedWords')
const isProhibited = require('../../../utils/isProhibited')
const removeCloudinary = require('../../../utils/removeCloudinary')
const { createPengaduan, getAllPengaduan, getPengaduanById, deletePengaduan } = require('./pengaduanMasyarakat.repository')

const createPengaduanService = async (data) => {
    if (data.isi.length > 200) {
        return new Error('Pengaduan Terlalu Panjang')
    }
    const checkWords = await isProhibited(data.isi, prohibitedWords)
    const checkWords2 = await isProhibited(data.subjek, prohibitedWords)
    if (checkWords === true || checkWords2 === true) {
        return new Error('Pengaduan Mengandung Kata Tidak Pantas')
    }
    if (data.foto === null) {
        delete data.foto
    }
    const pengaduan = await createPengaduan(data)
    return pengaduan
}

const getAllPengaduanService = async (wargaId) => {
    const pengaduan = await getAllPengaduan(wargaId)
    return pengaduan
}

const getPengaduanByIdService = async (pengaduanMasyarakatId, wargaId) => {
    const pengaduan = await getPengaduanById(pengaduanMasyarakatId)
    if (!pengaduan) {
        return new Error('Pengaduan Tidak Ditemukan')
    }
    if (pengaduan.wargaId !== parseInt(wargaId)) {
        return new Error('Pengaduan Tidak Bisa Diakses')
    }
    return pengaduan
}

const deletePengaduanService = async (pengaduanMasyarakatId, wargaId) => {
    const pengaduan = await getPengaduanById(parseInt(pengaduanMasyarakatId))
    if (!pengaduan) {
        return new Error('Pengaduan Tidak Ditemukan')
    }
    if (pengaduan.wargaId !== parseInt(wargaId)) {
        return new Error('Pengaduan Tidak Bisa Diakses')
    }
    if (pengaduan.foto !== null) {
        await removeCloudinary(pengaduan.foto, "pengaduan")
    }
    const deleting = await deletePengaduan(parseInt(pengaduanMasyarakatId))
    return deleting
}

module.exports = { createPengaduanService, getAllPengaduanService, getPengaduanByIdService, deletePengaduanService }