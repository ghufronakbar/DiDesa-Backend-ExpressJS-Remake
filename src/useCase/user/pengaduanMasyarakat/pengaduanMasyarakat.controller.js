const removeCloudinary = require('../../../utils/removeCloudinary')
const { createPengaduanService, getAllPengaduanService, getPengaduanByIdService, deletePengaduanService } = require('./pengaduanMasyarakat.service')

const createPengaduanController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    const { subjek, isi } = req.body
    const foto = req.file ? req.file.path : null
    try {
        if (!isi || !subjek) {
            if (foto !== null) { await removeCloudinary(req.file.path, "pengaduan") }
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Semua field wajib diisi' })
        }
        const data = { subjek, isi, wargaId, foto }
        const pengaduan = await createPengaduanService(data)
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil menambahkan pengaduan', data: pengaduan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getAllPengaduanController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(401).json({ status: 401, isLoggedIn, message: 'Harap Login terlebih dahulu' })
        }
        const pengaduan = await getAllPengaduanService(Number(wargaId))
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Pengaduan', data: pengaduan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getPengaduanByIdController = async (req, res) => {
    const { id } = req.params
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(401).json({ status: 401, isLoggedIn, message: 'Harap Login terlebih dahulu' })
        }
        const pengaduan = await getPengaduanByIdService(Number(id), Number(wargaId))
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Pengaduan', data: pengaduan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePengaduanController = async (req, res) => {
    const { id } = req.params
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(401).json({ status: 401, isLoggedIn, message: 'Harap Login terlebih dahulu' })
        }
        const pengaduan = await deletePengaduanService(Number(id), Number(wargaId))
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil menghapus pengaduan', data: pengaduan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    createPengaduanController,
    getAllPengaduanController,
    getPengaduanByIdController,
    deletePengaduanController
}