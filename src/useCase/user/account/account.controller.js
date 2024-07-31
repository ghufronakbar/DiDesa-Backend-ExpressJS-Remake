const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { loginService, profileService, updatePictureService, deletePictureService, forgotPasswordService, confirmForgotPasswordService, resetPasswordService } = require('./account.service')

const loginController = async (req, res) => {
    const { nik, password } = req.body
    try {
        if (!nik || !password) {
            return res.status(400).json({ status: 400,  message: 'Semua field wajib diisi' })
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
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Belum Login' })
        }
        const profile = await profileService(wargaId)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Profile', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const updatePictureController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Belum Login' })
        }
        if (!req.file) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Foto wajib diisi' })
        }
        const foto = req.file.path
        const profile = await updatePictureService(wargaId, foto)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil Mengedit Foto', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const deletePictureController = async (req, res) => {
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!isLoggedIn) {
            return res.status(400).json({ status: 400, isLoggedIn, message: 'Anda Belum Login' })
        }
        const profile = await deletePictureService(wargaId)
        if (profile instanceof Error) {
            return res.status(400).json({ status: 400, isLoggedIn, message: profile.message })
        }
        profile.foto === null ? profile.foto = PROFILE_DEFAULT : profile.foto
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil Menghapus Foto', data: profile })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

const forgotPasswordController = async (req, res) => {
    const { nik } = req.body
    const baseUrl = `${req.protocol}://${req.get('host')}`;
    try {
        if (!nik) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const forgotPassword = await forgotPasswordService(nik, baseUrl)
        if (forgotPassword instanceof Error) {
            return res.status(400).json({ status: 400, message: forgotPassword.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil Mengirim Link Lupa Password', data: forgotPassword })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const confirmForgotPasswordController = async (req, res) => {
    const { token } = req.params
    try {
        const reset = await confirmForgotPasswordService(token)
        if (reset instanceof Error) {
            return res.status(400).send(reset.message)
        }
        return res.status(200).send('Berhasil mengatur ulang password, check Whatsapp anda')
    } catch (error) {
        console.log(error)
        return res.status(500).send('Ada Kesalahan Sistem')
    }
}

const resetPasswordController = async (req, res) => {
    const { oldPassword, newPassword, confirmPassword } = req.body
    const { wargaId, isLoggedIn } = req.decoded
    try {
        if (!wargaId || !isLoggedIn) {
            return res.status(400).json({ status: 400, message: 'Anda Belum Login' })
        }
        if (!oldPassword || !newPassword || !confirmPassword) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const reset = await resetPasswordService(wargaId, newPassword, oldPassword, confirmPassword)
        if (reset instanceof Error) {
            return res.status(400).json({ status: 400, message: reset.message })
        }
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Berhasil Mengatur Ulang Password', data: reset })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { loginController, profileController, updatePictureController, deletePictureController, forgotPasswordController, confirmForgotPasswordController, resetPasswordController }