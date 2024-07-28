const { getAllUmkmService, getUmkmByIdService, deleteUmkmService, approveUmkmService } = require('./umkm.service');

const getAllUmkmController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? parseInt(page) : 1
        const { umkm, count } = await getAllUmkmService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: umkm.length,
            totalData: count
        }
        return res.status(200).json({ status: 200, message: 'Data Umkm', pagination, data: umkm })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getUmkmByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const umkm = await getUmkmByIdService(parseInt(id))
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Data Umkm', data: umkm })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteUmkmController = async (req, res) => {
    const { id } = req.params
    try {
        const umkm = await deleteUmkmService(parseInt(id))
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus umkm', data: umkm })
    } catch (error) {
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
        const umkm = await approveUmkmService(parseInt(id), approve)
        if (umkm instanceof Error) {
            return res.status(404).json({ status: 404, message: umkm.message })
        }
        return res.status(200).json({ status: 200, message, data: umkm })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllUmkmController, getUmkmByIdController, deleteUmkmController, approveUmkmController }