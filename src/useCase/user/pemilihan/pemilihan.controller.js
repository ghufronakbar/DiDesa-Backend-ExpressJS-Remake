const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getAllPemilihanService, getPemilihanByIdService, doVoteService, getLatestPemilihanService } = require('./pemilihan.service')

const getAllPemilihanController = async (req, res) => {
    const { isLoggedIn, wargaId } = req.decoded
    try {
        const pemilihan = await getAllPemilihanService(wargaId)
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pemilihan.message })
        }
        for (const p of pemilihan) {
            if (wargaId === 0) {
                p.isVoteable = false
            }
            for (const c of p.calonKetua) {
                c.warga.foto === null ? c.warga.foto = PROFILE_DEFAULT : c.warga.foto
            }
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getPemilihanByIdController = async (req, res) => {
    const { id } = req.params
    const { isLoggedIn, wargaId } = req.decoded
    try {
        const pemilihan = await getPemilihanByIdService(wargaId, parseInt(id))
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pemilihan.message })
        }
        for (const c of pemilihan.calonKetua) {
            c.warga.foto === null ? c.warga.foto = PROFILE_DEFAULT : c.warga.foto
        }
        if (wargaId === 0) {
            pemilihan.isVoteable = false
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const doVoteController = async (req, res) => {
    const { isLoggedIn, wargaId } = req.decoded
    const { calonKetuaId } = req.body
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Harus Login Terlebih Dahulu' })
        }
        if (!calonKetuaId) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Harap Memilih Calon' })
        }
        const pemilihan = await doVoteService(wargaId, calonKetuaId)
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pemilihan.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil melakukan pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const getLatestPemilihanController = async (req, res) => {
    const { isLoggedIn, wargaId } = req.decoded
    try {
        const pemilihan = await getLatestPemilihanService(wargaId)
        if (pemilihan instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: pemilihan.message })
        }
        if (wargaId === 0) {
            pemilihan.isVoteable = false
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Pemilihan', data: pemilihan })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getAllPemilihanController, getPemilihanByIdController, doVoteController, getLatestPemilihanController }