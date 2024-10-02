const removeCloudinary = require('../../../utils/removeCloudinary')
const { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm, createUmkm, getJenisUmkmById, getUmkmById, setStatusUmkm, editUmkm, deleteUmkm, getUmkmByWarga } = require('./umkm.repository')

const getUmkmLimitService = async (limit, search) => {
    const umkm = await getUmkmLimit(parseInt(limit), search)
    const count = await countUmkm(search)
    return { umkm, count }
}

const getUmkmByJenisService = async (id, limit, search) => {
    const umkm = await getUmkmByJenis(parseInt(id), parseInt(limit), search)
    const count = await countUmkmByJenis(parseInt(id), search)
    return { umkm, count }
}

const getJenisUmkmService = async () => {
    const umkm = await getJenisUmkm()
    return umkm
}

const createUmkmService = async (nama, deskripsi, lokasi, gambar, latitude, longitude, jenisUmkmId, wargaId) => {
    const checkJenis = await getJenisUmkmById(parseInt(jenisUmkmId))
    if (!checkJenis) {
        return new Error('Jenis Umkm Tidak Valid')
    }
    const umkm = await createUmkm(nama, deskripsi, lokasi, gambar, latitude, longitude, parseInt(jenisUmkmId), parseInt(wargaId))
    return umkm
}

const getUmkmByIdService = async (id, wargaId) => {
    const umkm = await getUmkmById(parseInt(id))
    if (!umkm) {
        return new Error('Data Umkm Tidak Ditemukan')
    }
    if (umkm.status === false && umkm.wargaId !== wargaId) {
        return new Error('UMKM belum dipublikasikan')
    }
    return umkm
}

const setStatusUmkmService = async (umkmId, wargaId, status) => {
    const check = await getUmkmById(parseInt(umkmId))
    if (!check) {
        return new Error('Data Umkm Tidak Ditemukan')
    }
    if (check.wargaId !== wargaId) {
        return new Error('Tidak Bisa Mengubah Status Umkm')
    }
    if (check.approve === false) {
        return new Error('UMKM yang belum disetujui tidak bisa diubah status')
    }
    if (typeof status !== 'boolean') {
        return new Error('Status Umkm Tidak Valid')
    }
    const umkm = await setStatusUmkm(parseInt(umkmId), status)
    return umkm
}

const editUmkmService = async (umkmId, data, wargaId) => {
    const check = await getUmkmById(parseInt(umkmId))
    if (!check) {
        return new Error('Data Umkm Tidak Ditemukan')
    }
    if (check.wargaId !== wargaId) {
        return new Error('Tidak Bisa Mengubah Umkm')
    }
    if (check.gambar && data.gambar) {
        await removeCloudinary(check.gambar, "umkm")
    } else {
        delete data.gambar
    }
    const umkm = await editUmkm(parseInt(umkmId), data)
    return umkm
}

const deleteUmkmService = async (umkmId, wargaId) => {
    const check = await getUmkmById(parseInt(umkmId))
    if (!check) {
        return new Error('Data Umkm Tidak Ditemukan')
    }
    if (check.wargaId !== wargaId) {
        return new Error('Tidak Bisa Menghapus Umkm')
    }
    if (check.gambar) {
        await removeCloudinary(check.gambar, "umkm")
    }
    const umkm = await deleteUmkm(parseInt(umkmId))
    return umkm
}

const getUmkmSayaService = async (wargaId) => {
    const umkm = await getUmkmByWarga(parseInt(wargaId))
    return umkm
}

module.exports = { getUmkmLimitService, getUmkmByJenisService, getJenisUmkmService, createUmkmService, getUmkmByIdService, setStatusUmkmService, editUmkmService, deleteUmkmService, getUmkmSayaService }