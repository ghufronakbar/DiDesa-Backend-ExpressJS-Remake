const {
    getAllPemilihan,
    getPemilihanById,
    createPemilihan,
    editPemilihan,
    deletePemilihan,
    createCalon,
    editCalon,
    deleteCalon,
    getWargaById
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
    const pemilihan = await createPemilihan(judul, deskripsi, tanggalMulai, tanggalSelesai)
    return pemilihan
}

const editPemilihanService = async (pemilihanKetuaId, judul, deskripsi, tanggalMulai, tanggalSelesai) => {
    const check = await getPemilihanById(pemilihanKetuaId)
    if (!check) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    const pemilihan = await editPemilihan(pemilihanKetuaId, judul, deskripsi, tanggalMulai, tanggalSelesai)
    return pemilihan
}

const deletePemilihanService = async (pemilihanKetuaId) => {
    const check = await getPemilihanById(pemilihanKetuaId)
    if (!check) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    const pemilihan = await deletePemilihan(pemilihanKetuaId)
    return pemilihan
}

const createCalonService = async (wargaId, pemilihanKetuaId, deskripsi) => {
    const checkPemilihan = await getPemilihanById(pemilihanKetuaId)
    if (!checkPemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    const checkWarga = await getWargaById(wargaId)
    if (!checkWarga) {
        return new Error('Warga Tidak Ditemukan')
    }
    const calon = await createCalon(wargaId, pemilihanKetuaId, deskripsi)
    return calon
}

const editCalonService = async (calonKetuaId, deskripsi) => {
    const calon = await editCalon(calonKetuaId, deskripsi)
    return calon
}

const deleteCalonService = async (calonKetuaId) => {
    const calon = await deleteCalon(calonKetuaId)
    return calon
}

module.exports = { getAllPemilihanService, getAllPemilihanByIdService, createPemilihanService, editPemilihanService, deletePemilihanService, createCalonService, editCalonService, deleteCalonService }