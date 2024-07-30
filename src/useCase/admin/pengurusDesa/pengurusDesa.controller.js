const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { warga } = require('../../../db/prisma')
const { getAllPengurusService, getPengurusByIdService, setAdminAccessPengurusService, setJabatanPengurusService, deletePengurusService, createPengurusService } = require('./pengurusDesa.service')

const getAllPengurusController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
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
        const pengurus = await getPengurusByIdService(parseInt(id))
        console.log(pengurus)
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
        const pengurus = await setAdminAccessPengurusService(parseInt(id), aksesAdmin)
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
        const pengurus = await setJabatanPengurusService(parseInt(id), jabatan)
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
    console.log(id)
    try {
        const pengurus = await deletePengurusService(parseInt(id))
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
        const data = { wargaId: parseInt(wargaId), jabatan }
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