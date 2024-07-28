const { getAllUmkm, countUmkm, getUmkmById, deleteUmkm, approveUmkm } = require('./umkm.repository');

const getAllUmkmService = async (page) => {
    const umkm = await getAllUmkm(page)
    const count = await countUmkm()
    return { umkm, count }
}

const getUmkmByIdService = async (umkmId) => {
    const umkm = await getUmkmById(umkmId)
    if (!umkm) {
        return new Error('UMKM tidak ditemukan')
    }
    return umkm
}

const deleteUmkmService = async (umkmId) => {
    const umkmCheck = await getUmkmById(umkmId)
    if (!umkmCheck) {
        return new Error('UMKM tidak ditemukan')
    }
    const umkm = await deleteUmkm(umkmId)
    return umkm
}

const approveUmkmService = async (umkmId, approve) => {
    const umkmCheck = await getUmkmById(umkmId)
    if (!umkmCheck) {
        return new Error('UMKM tidak ditemukan')
    }
    const umkm = await approveUmkm(umkmId, approve)
    return umkm
}

module.exports = { getAllUmkmService, getUmkmByIdService, deleteUmkmService, approveUmkmService }