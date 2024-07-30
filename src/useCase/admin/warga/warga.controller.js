const { getAllWargaService, getWargaByIdService, createWargaService, editWargaService, deleteWargaService, getIdWargaService } = require('./warga.service');
const { PROFILE_DEFAULT } = require('../../../constant/imageDefault');

const getAllWargaController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? parseInt(page) : 1
        const { warga, count } = await getAllWargaService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: warga.length,
            totalData: count
        }
        for (const w of warga) {
            w.foto == null ? w.foto = PROFILE_DEFAULT : w.foto
        }
        return res.status(200).json({ status: 200, message: 'Data Warga', pagination, data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getWargaByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const warga = await getWargaByIdService(parseInt(id))
        if (warga instanceof Error) {
            return res.status(404).json({ status: 404, message: warga.message })
        }
        warga.foto == null ? warga.foto = PROFILE_DEFAULT : warga.foto
        return res.status(200).json({ status: 200, message: 'Data Warga', data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const createWargaController = async (req, res) => {
    const { nik, kk, namaLengkap, tanggalLahir, telepon } = req.body
    try {
        if (!nik || !kk || !namaLengkap || !tanggalLahir || !telepon) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        const warga = await createWargaService(nik, kk, namaLengkap, tanggalLahir, telepon)
        if (warga instanceof Error) {
            return res.status(400).json({ status: 400, message: warga.message })
        }
        return res.status(201).json({ status: 201, message: 'Berhasil menambahkan warga', data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editWargaController = async (req, res) => {
    const { id } = req.params
    const { nik, kk, namaLengkap, tanggalLahir, telepon } = req.body
    try {
        if (!id || !nik || !kk || !namaLengkap || !tanggalLahir || !telepon) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        const warga = await editWargaService(parseInt(id), nik, kk, namaLengkap, tanggalLahir, telepon)
        if (warga instanceof Error) {
            return res.status(404).json({ status: 404, message: warga.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengedit warga', data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteWargaController = async (req, res) => {
    const { id } = req.params
    try {
        const warga = await deleteWargaService(parseInt(id))
        if (warga instanceof Error) {
            return res.status(404).json({ status: 404, message: warga.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus warga', data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getIdWargaController = async (req, res) => {
    try {
        const warga = await getIdWargaService()
        return res.status(200).json({ status: 200, message: 'Data Warga', data: warga })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    getAllWargaController,
    getWargaByIdController,
    createWargaController,
    editWargaController,
    deleteWargaController,
    getIdWargaController
}