const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getBeritaLimitService, getBeritaPrioritasService, getBeritaPopulerService, getDetailBeritaService } = require('./berita.service')

const getBeritaController = async (req, res) => {
    const { limit, q } = req.query
    const { isLoggedIn } = req.decoded
    const search = req.query.search || ''
    try {
        const queryLimit = limit ? parseInt(limit) : 5
        if (q === 'prioritas') {
            const { berita, count } = await getBeritaPrioritasService(queryLimit)
            const dataLength = {
                currentData: berita.length,
                totalData: count
            }
            return res.status(200).json({ status: 200, isLoggedIn, dataLength, message: 'Data Berita Prioritas', data: berita })
        } else if (q === 'populer') {
            const { berita, count } = await getBeritaPopulerService(queryLimit)
            const dataLength = {
                currentData: berita.length,
                totalData: count
            }
            return res.status(200).json({ status: 200, isLoggedIn, dataLength, message: 'Data Berita Populer', data: berita })
        } else {
            const { berita, count } = await getBeritaLimitService(queryLimit, search)
            const dataLength = {
                currentData: berita.length,
                totalData: count
            }
            return res.status(200).json({ status: 200, isLoggedIn, dataLength, message: 'Data Berita', data: berita })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getDetailBeritaController = async (req, res) => {
    const { id } = req.params
    const { wargaId, isLoggedIn } = req.decoded
    try {
        const berita = await getDetailBeritaService(parseInt(id))
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        for (const k of berita.komentar) {
            k.warga.foto === null ? k.warga.foto = PROFILE_DEFAULT : k.warga.foto
            if (k.warga.wargaId === 0) {
                k.warga.namaLengkap = k.warga.namaLengkap
                k.isDeleteable = false
            } else if (k.warga.wargaId === wargaId) {
                k.warga.namaLengkap = 'Saya'
                k.isDeleteable = true
            } else {
                k.isDeleteable = false
            }
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Berita', data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getBeritaController, getDetailBeritaController }