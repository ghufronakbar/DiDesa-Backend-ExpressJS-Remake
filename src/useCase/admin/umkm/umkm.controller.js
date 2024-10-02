const { getAllUmkmService, getUmkmByIdService, deleteUmkmService, approveUmkmService } = require('./umkm.service');
const { PROFILE_DEFAULT } = require('../../../constant/imageDefault');

const getAllUmkmController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
        const { umkm, count } = await getAllUmkmService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: umkm.length,
            totalData: count
        }
        for (const u of umkm) {
            u.warga.foto === null ? u.warga.foto = PROFILE_DEFAULT : u.warga.foto
            u.urlMap = u.latitude && u.longitude ? urlGoogleMap(u.latitude, u.longitude) : null
        }
        return res.status(200).json({ status: 200, message: 'Data Umkm', pagination, data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getUmkmByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const umkm = await getUmkmByIdService(Number(id))
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, message: umkm.message })
        }
        umkm.warga.foto === null ? umkm.warga.foto = PROFILE_DEFAULT : umkm.warga.foto
        umkm.urlMap = umkm.latitude && umkm.longitude ? urlGoogleMap(umkm.latitude, umkm.longitude) : null
        return res.status(200).json({ status: 200, message: 'Data Umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteUmkmController = async (req, res) => {
    const { id } = req.params
    try {
        const umkm = await deleteUmkmService(Number(id))
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus umkm', data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const approveUmkmController = async (req, res) => {
    const { id } = req.params
    const { approve } = req.body
    try {
        let message
        if (approve) {
            message = 'Berhasil menyetujui UMKM'
        } else {
            message = 'Berhasil menolak UMKM'
        }
        const umkm = await approveUmkmService(Number(id), approve)
        if (umkm instanceof Error) {
            return res.status(400).json({ status: 400, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message, data: umkm })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllUmkmController, getUmkmByIdController, deleteUmkmController, approveUmkmController }