const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { loginService, profileService, updatePictureService, deletePictureService } = require('./account.service')

const loginController = async (req, res) => {
    const { nik, password } = req.body
    try {
        if (!nik || !password) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const token = await loginService(nik, password)
        if (token instanceof Error) {
            return res.status(400).json({ status: 400, message: token.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil Login', token: token })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const profileController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!isLoggedIn) {
            return res.status(400).json({ status: 400, message: 'Anda Belum Login' })
        }
        const profile = await profileService(wargaId)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Profile', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const updatePictureController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!isLoggedIn) {
            return res.status(400).json({ status: 400, message: 'Anda Belum Login' })
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, message: 'Foto wajib diisi' })
        }
        const foto = req.file.path
        const profile = await updatePictureService(wargaId, foto)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil Mengedit Foto', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePictureController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!isLoggedIn) {
            return res.status(400).json({ status: 400, message: 'Anda Belum Login' })
        }
        const profile = await deletePictureService(wargaId)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil Menghapus Foto', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { loginController, profileController, updatePictureController, deletePictureController }