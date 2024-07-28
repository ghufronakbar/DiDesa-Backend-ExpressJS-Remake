const { getAllWarga, countWarga, getWargaById, checkNikById, checkByNik, createWarga, editWarga, deleteWarga } = require('./warga.repository');
const bcrypt = require('bcrypt');

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

const createWargaService = async (nik, kk, namaLengkap, tanggalLahir) => {
    const check = await checkByNik(nik)
    if (check) {
        return new Error('NIK sudah terdaftar')
    }
    const password = await bcrypt.hash(nik, 10)
    const warga = await createWarga(nik, kk, namaLengkap, tanggalLahir, password)
    return warga
}

const editWargaService = async (wargaId, nik, kk, namaLengkap, tanggalLahir) => {
    const check = await checkNikById(wargaId, nik)
    if (check) {
        return new Error('Nik sudah terdaftar')
    }    
    const warga = await editWarga(wargaId, nik, kk, namaLengkap, tanggalLahir)
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