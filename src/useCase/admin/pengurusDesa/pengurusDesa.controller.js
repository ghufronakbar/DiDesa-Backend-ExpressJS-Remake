const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { warga } = require('../../../db/prisma')
const { getAllPengurusService, getPengurusByIdService, setAdminAccessPengurusService, setJabatanPengurusService, deletePengurusService, createPengurusService } = require('./pengurusDesa.service')

const getAllPengurusController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
        if (isNaN(queryPage)) return res.status(400).json({ status: 400, message: 'Parameter page harus berupa angka' })
        const { pengurus, count } = await getAllPengurusService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: pengurus.length,
            totalData: count
        }
        for (const p of pengurus) {
            p.warga.foto == null ? p.warga.foto = PROFILE_DEFAULT : p.warga.foto
        }
        return res.status(200).json({ status: 200, message: 'Data Pengurus Desa', pagination, data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getPengurusByIdController = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const pengurus = await getPengurusByIdService(Number(id))
        if (pengurus instanceof Error) {
            return res.status(400).json({ status: 400, message: pengurus.message })
        }
        pengurus.warga.foto == null ? pengurus.warga.foto = PROFILE_DEFAULT : pengurus.warga.foto
        return res.status(200).json({ status: 200, message: 'Data Pengurus Desa', data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const setAdminAccessPengurusController = async (req, res) => {
    const { id } = req.params
    const { aksesAdmin } = req.body
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        if (typeof aksesAdmin !== 'boolean') {
            return res.status(400).json({ status: 400, message: 'Akses admin harus berupa boolean' })
        }
        const pengurus = await setAdminAccessPengurusService(Number(id), aksesAdmin)
        if (pengurus instanceof Error) {
            return res.status(400).json({ status: 400, message: pengurus.message })
        }
        let message = ''
        if (aksesAdmin == true) {
            message = 'Berhasil menambahkan akses admin'
        } else if (aksesAdmin == false) {
            message = 'Berhasil menghapus akses admin'
        }
        return res.status(200).json({ status: 200, message, data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const setJabatanPengurusController = async (req, res) => {
    const { id } = req.params
    const { jabatan } = req.body
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        if (!jabatan) {
            return res.status(400).json({ status: 400, message: 'Jabatan harus diisi' })
        }
        const pengurus = await setJabatanPengurusService(Number(id), jabatan)
        if (pengurus instanceof Error) {
            return res.status(400).json({ status: 400, message: pengurus.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengubah jabatan', data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePengurusController = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const pengurus = await deletePengurusService(Number(id))
        if (pengurus instanceof Error) {
            return res.status(400).json({ status: 400, message: pengurus.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus data', data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const createPengurusController = async (req, res) => {
    const { wargaId, jabatan } = req.body
    try {
        if (!wargaId || !jabatan) {
            return res.status(400).json({ status: 400, message: 'Data wajib diisi' })
        }
        if (isNaN(Number(wargaId))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const data = { wargaId: Number(wargaId), jabatan }
        const pengurus = await createPengurusService(data)
        if (pengurus instanceof Error) {
            return res.status(400).json({ status: 400, message: pengurus.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menambahkan data', data: pengurus })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    getAllPengurusController,
    getPengurusByIdController,
    setAdminAccessPengurusController,
    setJabatanPengurusController,
    deletePengurusController,
    createPengurusController
}