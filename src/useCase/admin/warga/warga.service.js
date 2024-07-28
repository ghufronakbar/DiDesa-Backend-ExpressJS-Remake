const { getAllWarga, countWarga, getWargaById, checkNikById, checkByNik, createWarga, editWarga, deleteWarga } = require('./warga.repository');
const bcrypt = require('bcrypt');
const randomCharacter = require('../../../utils/randomCharacter')
const sendWhatsapp = require('../../../utils/sendWhatsapp')
const messagePassword = require('../../../helper/messagePassword')


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

const createWargaService = async (nik, kk, namaLengkap, tanggalLahir, telepon) => {
    const check = await checkByNik(nik)
    if (check) {
        return new Error('NIK sudah terdaftar')
    }
    const password = randomCharacter(8)
    const hashedPassword = await bcrypt.hash(password, 10)
    const warga = await createWarga(nik, kk, namaLengkap, tanggalLahir, hashedPassword, telepon)
    const message = messagePassword(namaLengkap, nik, password)
    await sendWhatsapp(telepon, message)
    return warga
}

const editWargaService = async (wargaId, nik, kk, namaLengkap, tanggalLahir, telepon) => {
    const check = await checkNikById(wargaId, nik)
    if (check) {
        return new Error('NIK sudah terdaftar')
    }
    const warga = await editWarga(wargaId, nik, kk, namaLengkap, tanggalLahir, telepon)
    return warga
}

const deleteWargaService = async (wargaId) => {
    const wargaCheck = await getWargaById(wargaId)
    if (!wargaCheck) {
        return new Error('Warga tidak ditemukan')
    }
    const warga = await deleteWarga(wargaId)
    return warga
}

module.exports = { getAllWargaService, getWargaByIdService, createWargaService, editWargaService, deleteWargaService }