const { getAllJenisUmkmService, getJenisUmkmByIdService, createJenisUmkmService, editJenisUmkmService, deleteJenisUmkmService } = require('./jenisUmkm.service')

const getAllJenisUmkmController = async (req, res) => {
    try {
        const umkm = await getAllJenisUmkmService()
        return res.status(200).json({ status: 200, message: 'Jenis Umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getJenisUmkmByIdController = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const umkm = await getJenisUmkmByIdService(Number(id))
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Jenis Umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const createJenisUmkmController = async (req, res) => {
    const { namaJenisUmkm } = req.body
    try {
        if (!namaJenisUmkm) {
            return res.status(400).json({ status: 400, message: 'Nama harus diisi' })
        }
        const umkm = await createJenisUmkmService(namaJenisUmkm)
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menambahkan umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editJenisUmkmController = async (req, res) => {
    const { id } = req.params
    const { namaJenisUmkm } = req.body
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        if (!namaJenisUmkm) {
            return res.status(400).json({ status: 400, message: 'Nama harus diisi' })
        }
        const umkm = await editJenisUmkmService(Number(id), namaJenisUmkm)
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengedit umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteJenisUmkmController = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const umkm = await deleteJenisUmkmService(Number(id))
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    getAllJenisUmkmController,
    getJenisUmkmByIdController,
    createJenisUmkmController,
    editJenisUmkmController,
    deleteJenisUmkmController
}
