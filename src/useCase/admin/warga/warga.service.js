const { getAllWarga, countWarga, getWargaById, checkNikById, checkByNik, createWarga, editWarga, deleteWarga, getIdWarga } = require('./warga.repository');
const bcrypt = require('bcrypt');
const randomCharacter = require('../../../utils/randomCharacter')
const sendWhatsapp = require('../../../utils/sendWhatsapp')
const { messageCreate } = require('../../../helper/messagePassword')


const getAllWargaService = async (page) => {
    const warga = await getAllWarga(page)
    const count = await countWarga()
    return { warga, count }
}

const getWargaByIdService = async (wargaId) => {
    const warga = await getWargaById(wargaId)
    if (!warga) {
        return new Error('Warga tidak ditemukan')
    }
    return warga
}

const createWargaService = async (nik, namaLengkap, tanggalLahir, telepon, rw) => {
    const check = await checkByNik(nik)
    if (check) {
        return new Error('NIK sudah terdaftar')
    }
    const password = randomCharacter(8)
    const hashedPassword = await bcrypt.hash(password, 10)
    const warga = await createWarga(nik, namaLengkap, tanggalLahir, hashedPassword, telepon, rw)
    const message = messageCreate(namaLengkap, nik, password)
    await sendWhatsapp(telepon, message)
    return warga
}

const editWargaService = async (wargaId, nik, namaLengkap, tanggalLahir, telepon, rw) => {
    const check = await checkNikById(wargaId, nik)
    if (check) {
        return new Error('NIK sudah terdaftar')
    }
    const warga = await editWarga(wargaId, nik, namaLengkap, tanggalLahir, telepon, rw)
    return warga
}

const deleteWargaService = async (wargaId) => {
    const wargaCheck = await getWargaById(wargaId)
    if (!wargaCheck) {
        return new Error('Warga tidak ditemukan')
    }
    if (wargaCheck.foto) {
        const removeImage = await removeCloudinary(wargaCheck.foto, "profile")
        if (removeImage instanceof Error) {
            return removeImage
        }
    }
    const warga = await deleteWarga(wargaId)
    return warga
}

const getIdWargaService = async () => {
    const warga = await getIdWarga();
    return warga
}

module.exports = { getAllWargaService, getWargaByIdService, createWargaService, editWargaService, deleteWargaService, getIdWargaService }