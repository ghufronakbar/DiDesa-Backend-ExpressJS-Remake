const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getAllPemilihanService, getAllPemilihanByIdService, createPemilihanService, editPemilihanService, deletePemilihanService, createCalonService, editCalonService, deleteCalonService } = require('./pemilihan.service')

const getAllPemilihanController = async (req, res) => {
    try {
        const pemilihan = await getAllPemilihanService()
        for(const p of pemilihan) {
            for(const c of p.calonKetua) {
                c.warga.foto == null ? c.warga.foto = PROFILE_DEFAULT : c.warga.foto
            }
        }            
        return res.status(200).json({ status: 200, message: 'Data Pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getPemilihanByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const pemilihan = await getAllPemilihanByIdService(parseInt(id))
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, message: pemilihan.message })
        }
        for(const p of pemilihan.calonKetua) {
            p.warga.foto == null ? p.warga.foto = PROFILE_DEFAULT : p.warga.foto
        }
        return res.status(200).json({ status: 200, message: 'Data Pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const createPemilihanController = async (req, res) => {
    const { judul, deskripsi, tanggalMulai, tanggalSelesai } = req.body
    const date = new Date()
    try {
        if (!judul || !deskripsi || !tanggalMulai || !tanggalSelesai) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        if (new Date(tanggalMulai) < date) {
            return res.status(400).json({
                status: 400,
                message: 'Pemilihan tidak boleh dibuat sebelum tanggal sekarang'
            })
        }
        if (new Date(tanggalSelesai) < new Date(tanggalMulai)) {
            return res.status(400).json({
                status: 400,
                message: 'Tanggal tidak valid'
            })
        }
        const pemilihan = await createPemilihanService(judul, deskripsi, tanggalMulai, tanggalSelesai)
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, message: pemilihan.message })
        }
        return res.status(201).json({ status: 201, message: 'Berhasil menambahkan pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editPemilihanController = async (req, res) => {
    const { id } = req.params
    const { judul, deskripsi, tanggalMulai, tanggalSelesai } = req.body
    const date = new Date()
    try {
        if (!id || !judul || !deskripsi || !tanggalMulai || !tanggalSelesai) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        if (new Date(tanggalMulai) < date) {
            return res.status(400).json({
                status: 400,
                message: 'Pemilihan tidak boleh dibuat sebelum tanggal sekarang'
            })
        }
        if (new Date(tanggalSelesai) < new Date(tanggalMulai)) {
            return res.status(400).json({
                status: 400,
                message: 'Tanggal tidak valid'
            })
        }
        const pemilihan = await editPemilihanService(parseInt(id), judul, deskripsi, tanggalMulai, tanggalSelesai)
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, message: pemilihan.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengedit pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePemilihanController = async (req, res) => {
    const { id } = req.params
    try {
        const pemilihan = await deletePemilihanService(parseInt(id))
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, message: pemilihan.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const createCalonController = async (req, res) => {
    const { wargaId, pemilihanKetuaId, deskripsi } = req.body
    try {
        if (!wargaId || !pemilihanKetuaId || !deskripsi) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        const calon = await createCalonService(parseInt(wargaId), parseInt(pemilihanKetuaId), deskripsi)
        if (calon instanceof Error) {
            return res.status(400).json({ status: 400, message: calon.message })
        }
        return res.status(201).json({ status: 201, message: 'Berhasil menambahkan calon', data: calon })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editCalonController = async (req, res) => {
    const { id } = req.params
    const { deskripsi } = req.body
    try {
        if (!id || !deskripsi) {
            return res.status(400).json({
                status: 400,
                message: 'Data wajib diisi'
            })
        }
        const calon = await editCalonService(parseInt(id), deskripsi)
        if (calon instanceof Error) {
            return res.status(400).json({ status: 400, message: calon.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengedit calon', data: calon })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteCalonController = async (req, res) => {
    const { id } = req.params
    try {
        const calon = await deleteCalonService(parseInt(id))
        if (calon instanceof Error) {
            return res.status(400).json({ status: 400, message: calon.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus calon', data: calon })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllPemilihanController, getPemilihanByIdController, createPemilihanController, editPemilihanController, deletePemilihanController, createCalonController, editCalonController, deleteCalonController }