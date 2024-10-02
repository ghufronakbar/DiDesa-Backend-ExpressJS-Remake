const { getPengaduanService, deletePengaduanService, getPengaduanByIdService } = require('./pengaduanMasyarakat.service');

const getPengaduanController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
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

module.exports = { getPengaduanController, deletePengaduanController, getPengaduanByIdController }