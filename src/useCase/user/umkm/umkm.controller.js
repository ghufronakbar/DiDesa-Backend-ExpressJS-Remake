const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const removeCloudinary = require('../../../utils/removeCloudinary')
const { getUmkmLimitService, getUmkmByJenisService, getJenisUmkmService, createUmkmService, getUmkmByIdService, setStatusUmkmService, editUmkmService, deleteUmkmService, getUmkmSayaService } = require('./umkm.service')
const urlGoogleMap = require('../../../helper/urlGoogleMap')

const getUmkmLimitController = async (req, res) => {
    const { limit, q } = req.query
    const { wargaId, isLoggedIn } = req.decoded
    const search = req.query.search || ''
    try {
        const queryLimit = limit ? Number(limit) : 5
        if (q && isNaN(Number(q))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Jenis Umkm Tidak Valid' })
        }
        if (q && Number(q) !== 0) {
            const { umkm, count } = await getUmkmByJenisService(q, queryLimit, search)
            const dataLength = {
                currentData: umkm.length,
                totalData: count
            }
            for (const u of umkm) {
                u.warga.foto === null ? u.warga.foto = PROFILE_DEFAULT : u.warga.foto
                if (u.warga.wargaId === wargaId) {
                    u.isEditable = true
                } else {
                    u.isEditable = false
                }
            }
            return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', dataLength, data: umkm, })
        } else {
            const { umkm, count } = await getUmkmLimitService(queryLimit, search)
            const dataLength = {
                currentData: umkm.length,
                totalData: count
            }
            for (const u of umkm) {
                u.warga.foto === null ? u.warga.foto = PROFILE_DEFAULT : u.warga.foto
                if (u.warga.wargaId === wargaId) {
                    u.isEditable = true
                } else {
                    u.isEditable = false
                }
                u.urlMap = u.latitude && u.longitude ? urlGoogleMap(u.latitude, u.longitude) : null
            }
            return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', dataLength, data: umkm, })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getJenisUmkmController = async (req, res) => {
    const { isLoggedIn } = req.decoded
    try {
        const data = await getJenisUmkmService()
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Jenis Umkm', data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const createUmkmController = async (req, res) => {
    const { isLoggedIn, wargaId } = req.decoded
    const { nama, deskripsi, lokasi, latitude, longitude, jenisUmkmId } = req.body
    try {
        if (!wargaId || !isLoggedIn) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        if (!nama || !deskripsi || !lokasi || !jenisUmkmId) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Data wajib diisi' })
        }
        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Latitude dan Longitude harus number' })
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Gambar wajib diisi' })
        }
        const gambar = req.file.path
        const umkm = await createUmkmService(nama, deskripsi, lokasi, gambar, latitude, longitude, jenisUmkmId, wargaId)
        if (umkm instanceof Error) {
            await removeCloudinary(req.file.path, "umkm")
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil mendaftarkan UMKM', data: umkm })
    } catch (error) {
        console.log(error)
        if (req.file && req.file.path) {
            await removeCloudinary(req.file.path, "umkm")
        }
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getUmkmByIdController = async (req, res) => {
    const { id } = req.params
    const { isLoggedIn, wargaId } = req.decoded
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'ID Harus berupa angka' })
        }
        const umkm = await getUmkmByIdService(Number(id), Number(wargaId))
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }

        umkm.warga.foto === null ? umkm.warga.foto = PROFILE_DEFAULT : umkm.warga.foto
        if (umkm.warga.wargaId === wargaId) {
            umkm.isEditable = true
        } else {
            umkm.isEditable = false
        }
        umkm.urlMap = umkm.latitude && umkm.longitude ? urlGoogleMap(umkm.latitude, umkm.longitude) : null

        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const setStatusUmkmController = async (req, res) => {
    const { id } = req.params
    const { isLoggedIn, wargaId } = req.decoded
    const { status } = req.body
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'ID Harus berupa angka' })
        }
        const umkm = await setStatusUmkmService(Number(id), wargaId, status)
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }
        let message = ''
        if (status === true) {
            message = 'Berhasil mengaktifkan umkm'
        } else if (status === false) {
            message = 'Berhasil menonaktifkan umkm'
        }
        return res.status(200).json({ status: 200, isLoggedIn, message, data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const editUmkmController = async (req, res) => {
    const { id } = req.params
    const { isLoggedIn, wargaId } = req.decoded
    const { nama, deskripsi, lokasi, latitude, longitude } = req.body
    const gambar = req.file ? req.file.path : null
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'ID Harus berupa angka' })
        }
        if (!wargaId || !isLoggedIn) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        if (!nama || !deskripsi || !lokasi || !latitude || !longitude) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Data wajib diisi' })
        }
        if (isNaN(Number(latitude)) || isNaN(Number(longitude))) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Latitude dan Longitude harus number' })
        }
        const data = { nama, deskripsi, lokasi, latitude, longitude }
        data.gambar = gambar
        const umkm = await editUmkmService(Number(id), data, wargaId)
        if (umkm instanceof Error) {
            if (req.file && req.file.path) { await removeCloudinary(req.file.path, "umkm") }
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil mengedit umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteUmkmController = async (req, res) => {
    const { id } = req.params
    const { isLoggedIn, wargaId } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'ID Harus berupa angka' })
        }
        const umkm = await deleteUmkmService(Number(id), Number(wargaId))
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil menghapus umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getUmkmSayaController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        const umkm = await getUmkmSayaService(Number(wargaId))
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: umkm.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    getUmkmLimitController,
    getJenisUmkmController,
    createUmkmController,
    getUmkmByIdController,
    setStatusUmkmController,
    editUmkmController,
    deleteUmkmController,
    getUmkmSayaController
}