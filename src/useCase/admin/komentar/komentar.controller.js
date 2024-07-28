const { getAllKomentarService, deleteKomentarService, getKomentarByIdService } = require('./komentar.service')

const getAllKomentarController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? parseInt(page) : 1
        const { komentar, count } = await getAllKomentarService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: komentar.length,
            totalData: count
        }
        return res.status(200).json({ status: 200, message: 'Data Komentar', pagination, data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getKomentarByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const komentar = await getKomentarByIdService(parseInt(id))
        if (komentar instanceof Error) {
            return res.status(404).json({ status: 404, message: komentar.message })
        }
        return res.status(200).json({ status: 200, message: 'Data Komentar', data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteKomentarController = async (req, res) => {
    const { id } = req.params
    try {
        const komentar = await deleteKomentarService(parseInt(id))
        if (komentar instanceof Error) {
            return res.status(404).json({ status: 404, message: komentar.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus komentar', data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllKomentarController, deleteKomentarController }