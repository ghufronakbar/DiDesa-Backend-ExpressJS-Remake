const { getAllKomentarService, deleteKomentarService, getKomentarByIdService } = require('./komentar.service')
const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')

const getAllKomentarController = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
        if (isNaN(queryPage)) return res.status(400).json({ status: 400, message: 'Parameter page harus berupa angka' })
        const { komentar, count } = await getAllKomentarService(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: komentar.length,
            totalData: count
        }
        for(const k of komentar) {
            k.warga.foto === null ? k.warga.foto = PROFILE_DEFAULT : k.warga.foto
        }
        return res.status(200).json({ status: 200, message: 'Data Komentar', pagination, data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getKomentarByIdController = async (req, res) => {
    const { id } = req.params
    try {
        const komentar = await getKomentarByIdService(Number(id))
        if (komentar instanceof Error) {
            return res.status(400).json({ status: 400, message: komentar.message })
        }
        komentar.warga.foto === null ? komentar.warga.foto = PROFILE_DEFAULT : komentar.warga.foto
        return res.status(200).json({ status: 200, message: 'Data Komentar', data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteKomentarController = async (req, res) => {
    const { id } = req.params
    try {
        const komentar = await deleteKomentarService(Number(id))
        if (komentar instanceof Error) {
            return res.status(400).json({ status: 400, message: komentar.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus komentar', data: komentar })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllKomentarController, deleteKomentarController }