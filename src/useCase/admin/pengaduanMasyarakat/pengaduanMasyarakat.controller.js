const { getPengaduanService, deletePengaduanService, getPengaduanByIdService, setStatusService } = require('./pengaduanMasyarakat.service');

const getPengaduanController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
        if (isNaN(queryPage)) return res.status(400).json({ status: 400, message: 'Parameter page harus berupa angka' })
        const { pengaduan, count } = await getPengaduanService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: pengaduan.length,
            totalData: count
        }
        return res.status(200).json({ status: 200, message: 'Data Pengaduan', pagination, data: pengaduan })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getPengaduanByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const pengaduan = await getPengaduanByIdService(Number(id))
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, message: 'Data Pengaduan', data: pengaduan })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePengaduanController = async (req, res) => {
    const { id } = req.params
    try {
        const pengaduan = await deletePengaduanService(Number(id))
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus pengaduan', data: pengaduan })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const setStatus = async (req, res) => {
    const { id } = req.params
    const { status } = req.body
    if (isNaN(Number(id))) {
        return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
    }
    if (typeof status !== 'boolean') {
        return res.status(400).json({ status: 400, message: 'Status harus berupa boolean' })
    }
    try {
        const pengaduan = await setStatusService(Number(id), status)
        if (pengaduan instanceof Error) {
            return res.status(400).json({ status: 400, message: pengaduan.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengubah status pengaduan', data: pengaduan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getPengaduanController, deletePengaduanController, getPengaduanByIdController, setStatus }