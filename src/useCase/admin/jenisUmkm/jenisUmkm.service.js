const  { getAllJenisUmkm, getJenisUmkmById, createJenisUmkm, editJenisUmkm, deleteJenisUmkm } = require('./jenisUmkm.repository')

const getAllJenisUmkmService = async () => {
    const umkm = await getAllJenisUmkm()
    return umkm
}

const getJenisUmkmByIdService = async (jenisUmkmId) => {
    const umkm = await getJenisUmkmById(jenisUmkmId)
    if (!umkm) {
        return new Error('Jenis Umkm tidak ditemukan')
    }
    return umkm
}

const createJenisUmkmService = async (namaJenisUmkm) => {
    const umkm = await createJenisUmkm(namaJenisUmkm)
    return umkm
}

const editJenisUmkmService = async (jenisUmkmId, namaJenisUmkm) => {
    const check = await getJenisUmkmById(jenisUmkmId)
    if (!check) {
        return new Error('Jenis Umkm tidak ditemukan')
    }
    const umkm = await editJenisUmkm(jenisUmkmId, namaJenisUmkm)
    return umkm
}

const deleteJenisUmkmService = async (jenisUmkmId) => {
    const check = await getJenisUmkmById(jenisUmkmId)
    if (!check) {
        return new Error('Jenis Umkm tidak ditemukan')
    }    
    const umkm = await deleteJenisUmkm(jenisUmkmId)
    return umkm
}

module.exports = { getAllJenisUmkmService, getJenisUmkmByIdService, createJenisUmkmService, editJenisUmkmService, deleteJenisUmkmService }