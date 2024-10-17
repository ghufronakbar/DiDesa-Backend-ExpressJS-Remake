const { messageNotApproveUmkm, messageApproveUmkm, messageDeleteUmkm } = require('../../../helper/messageInfo');
const removeCloudinary = require('../../../utils/removeCloudinary');
const sendWhatsapp = require('../../../utils/sendWhatsapp');
const { getAllUmkm, countUmkm, getUmkmById, deleteUmkm, approveUmkm, setInactiveUmkm } = require('./umkm.repository');

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
    if (umkmCheck.gambar) {
        const removeImage = await removeCloudinary(umkmCheck.gambar, "umkm")
        if (removeImage instanceof Error) {
            return removeImage
        }
    }
    const message = messageDeleteUmkm(umkmCheck.nama, umkmCheck.jenisUmkm.namaJenisUmkm, umkmCheck.warga.namaLengkap)
    await sendWhatsapp(umkmCheck.warga.telepon, message)
    const umkm = await deleteUmkm(umkmId)
    return umkm
}

const approveUmkmService = async (umkmId, approve) => {
    const umkmCheck = await getUmkmById(umkmId)
    if (!umkmCheck) {
        return new Error('UMKM tidak ditemukan')
    }
    const umkm = await approveUmkm(umkmId, approve)
    const date = new Date()
    const dateISO = date.toISOString()
    let message = ''
    if (umkm.approve === false) {
        await setInactiveUmkm(umkmId)
        message = messageNotApproveUmkm(umkmCheck.nama, umkmCheck.jenisUmkm.namaJenisUmkm, umkmCheck.warga.namaLengkap)
    } else {
        message = messageApproveUmkm(umkmCheck.nama, umkmCheck.jenisUmkm.namaJenisUmkm, umkmCheck.warga.namaLengkap, dateISO)
    }
    await sendWhatsapp(umkmCheck.warga.telepon, message)
    return umkm
}

module.exports = { getAllUmkmService, getUmkmByIdService, deleteUmkmService, approveUmkmService }