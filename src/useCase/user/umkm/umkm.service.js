const removeCloudinary = require('../../../utils/removeCloudinary')
const { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm, createUmkm, getJenisUmkmById, getUmkmById, setStatusUmkm, editUmkm } = require('./umkm.repository')

const getUmkmLimitService = async (limit) => {
    const umkm = await getUmkmLimit(parseInt(limit))
    const count = await countUmkm()
    return { umkm, count }
}

const getUmkmByJenisService = async (id, limit) => {
    const umkm = await getUmkmByJenis(parseInt(id), parseInt(limit))
    const count = await countUmkmByJenis(parseInt(id))
    return { umkm, count }
}

const getJenisUmkmService = async () => {
    const umkm = await getJenisUmkm()
    return umkm
}

const createUmkmService = async (nama, deskripsi, lokasi, gambar, jenisUmkmId, wargaId) => {
    const checkJenis = await getJenisUmkmById(parseInt(jenisUmkmId))
    if (!checkJenis) {
        return new Error('Jenis Umkm Tidak Valid')
    }
    const umkm = await createUmkm(nama, deskripsi, lokasi, gambar, parseInt(jenisUmkmId), parseInt(wargaId))
    return umkm
}

const getUmkmByIdService = async (id) => {
    const umkm = await getUmkmById(parseInt(id))
    if (!umkm) {
        return new Error('Data Umkm Tidak Ditemukan')
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


module.exports = { getUmkmLimitService, getUmkmByJenisService, getJenisUmkmService, createUmkmService, getUmkmByIdService, setStatusUmkmService, editUmkmService }