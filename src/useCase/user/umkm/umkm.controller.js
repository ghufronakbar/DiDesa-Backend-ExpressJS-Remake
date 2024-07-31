const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getUmkmLimitService, getUmkmByJenisService, getJenisUmkmService } = require('./umkm.service')

const getUmkmLimitController = async (req, res) => {
    const { limit, q } = req.query
    const { wargaId, isLoggedIn } = req.decoded    
    try {
        const queryLimit = limit ? parseInt(limit) : 5
        if (q && isNaN(parseInt(q))) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Jenis Umkm Tidak Valid' })
        }
        if (q) {
            const { umkm, count } = await getUmkmByJenisService(q, queryLimit)
            const dataLength = {
                currentData: umkm.length,
                totalData: count
            }
            for (const u of umkm) {
                u.warga.foto === null ? u.warga.foto = PROFILE_DEFAULT : u.warga.foto
                if (u.warga.wargaId === wargaId) {
                    u.isEditable = true
                } else {
                    u.isEditable = false
                }
            }
            return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', dataLength, data: umkm, })
        } else {
            const { umkm, count } = await getUmkmLimitService(queryLimit)
            const dataLength = {
                currentData: umkm.length,
                totalData: count
            }
            for (const u of umkm) {
                u.warga.foto === null ? u.warga.foto = PROFILE_DEFAULT : u.warga.foto
                if (u.warga.wargaId === wargaId) {
                    u.isEditable = true
                } else {
                    u.isEditable = false
                }
            }
            return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Umkm', dataLength, data: umkm, })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const getJenisUmkmController = async (req, res) => {
    const { isLoggedIn } = req.decoded
    try {
        const data = await getJenisUmkmService()
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Jenis Umkm', data })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = {
    getUmkmLimitController,
    getJenisUmkmController
}