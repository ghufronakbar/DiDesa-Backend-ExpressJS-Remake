const { createKomentarService, deleteKomentarService } = require('./komentar.service')

const createKomentarController = async (req, res) => {
    const { isi, beritaId } = req.body
    const { wargaId, isLoggedIn } = req.decoded
    try {      
        if (!isi || !beritaId) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Semua field wajib diisi' })
        }
        const komentar = await createKomentarService(isi, beritaId, wargaId)
        if (komentar instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: komentar.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil menambahkan komentar', data: komentar })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteKomentarController = async (req, res) => {
    const { id } = req.params
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(401).json({ status: 401, isLoggedIn, message: 'Harap Login terlebih dahulu' })
        }
        const komentar = await deleteKomentarService(id, wargaId)
        if (komentar instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: komentar.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil menghapus komentar', data: komentar })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    createKomentarController,
    deleteKomentarController
}
