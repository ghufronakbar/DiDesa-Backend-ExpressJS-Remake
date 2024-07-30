const {
    getAllPemilihan,
    getPemilihanById,
    createPemilihan,
    editPemilihan,
    deletePemilihan,
    createCalon,
    editCalon,
    deleteCalon,
    getWargaById,
    countPemilihanAfterToday,
    getPemilihanByCalonId
} = require('./pemilihan.repository')

const getAllPemilihanService = async () => {
    const pemilihan = await getAllPemilihan()
    return pemilihan
}

const getAllPemilihanByIdService = async (pemilihanKetuaId) => {
    const pemilihan = await getPemilihanById(pemilihanKetuaId)
    if (!pemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    return pemilihan
}

const createPemilihanService = async (judul, deskripsi, tanggalMulai, tanggalSelesai) => {
    const validate = await countPemilihanAfterToday()
    if (validate > 0) {
        return new Error('Sudah Ada Pemilihan Berlangsung')
    }
    const pemilihan = await createPemilihan(judul, deskripsi, tanggalMulai, tanggalSelesai)
    return pemilihan
}

const editPemilihanService = async (pemilihanKetuaId, judul, deskripsi, tanggalMulai, tanggalSelesai) => {
    const check = await getPemilihanById(pemilihanKetuaId)
    if (!check) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (check.tanggalSelesai < new Date()) {
        return new Error('Pemilihan yang Sudah Selesai Tidak Bisa Diubah')
    }
    if (check.tanggalMulai < new Date()) {
        return new Error('Pemilihan yang Sedang Berlangsung Tidak Bisa Diubah')
    }
    const pemilihan = await editPemilihan(pemilihanKetuaId, judul, deskripsi, tanggalMulai, tanggalSelesai)
    return pemilihan
}

const deletePemilihanService = async (pemilihanKetuaId) => {
    const check = await getPemilihanById(pemilihanKetuaId)
    if (!check) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (check.tanggalSelesai < new Date()) {
        return new Error('Pemilihan yang Sudah Selesai Tidak Bisa Diubah')
    }
    if (check.tanggalMulai < new Date()) {
        return new Error('Pemilihan yang Sedang Berlangsung Tidak Bisa Dihapus')
    }
    const pemilihan = await deletePemilihan(pemilihanKetuaId)
    return pemilihan
}

const createCalonService = async (wargaId, pemilihanKetuaId, deskripsi) => {
    const checkPemilihan = await getPemilihanById(pemilihanKetuaId)
    if (!checkPemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (checkPemilihan.tanggalSelesai < new Date()) {
        return new Error('Pemilihan yang Sudah Selesai Tidak Bisa Diubah')
    }
    if (checkPemilihan.tanggalMulai < new Date()) {
        return new Error('Pemilihan yang Sedang Berlangsung Tidak Bisa Diubah')
    }
    const checkWarga = await getWargaById(wargaId)
    if (!checkWarga) {
        return new Error('Warga Tidak Ditemukan')
    }
    const calon = await createCalon(wargaId, pemilihanKetuaId, deskripsi)
    return calon
}

const editCalonService = async (calonKetuaId, deskripsi) => {
    const check = await getPemilihanByCalonId(calonKetuaId)
    if (!check) {
        return new Error('Calon Tidak Ditemukan')
    }
    const pemilihanId = check.pemilihanKetuaId
    const checkPemilihan = await getPemilihanById(pemilihanId)
    if (!checkPemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (checkPemilihan.tanggalSelesai < new Date()) {
        return new Error('Pemilihan yang Sudah Selesai Tidak Bisa Diubah')
    }
    if (checkPemilihan.tanggalMulai < new Date()) {
        return new Error('Pemilihan yang Sedang Berlangsung Tidak Bisa Diubah')
    }
    const calon = await editCalon(calonKetuaId, deskripsi)
    return calon
}

const deleteCalonService = async (calonKetuaId) => {
    const check = await getPemilihanByCalonId(calonKetuaId)
    if (!check) {
        return new Error('Calon Tidak Ditemukan')
    }
    const pemilihanId = check.pemilihanKetuaId
    const checkPemilihan = await getPemilihanById(pemilihanId)
    if (!checkPemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (checkPemilihan.tanggalSelesai < new Date()) {
        return new Error('Pemilihan yang Sudah Selesai Tidak Bisa Diubah')
    }
    if (checkPemilihan.tanggalMulai < new Date()) {
        return new Error('Pemilihan yang Sedang Berlangsung Tidak Bisa Diubah')
    }
    const calon = await deleteCalon(calonKetuaId)
    return calon
}

module.exports = { getAllPemilihanService, getAllPemilihanByIdService, createPemilihanService, editPemilihanService, deletePemilihanService, createCalonService, editCalonService, deleteCalonService }