const { getAccount, updateToken, getProfile, updatePicture, createForgotPassword, getForgotPassword, validateToken, setUsedToken, updatePassword } = require('./account.repository')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../../../constant')
const jwt = require('jsonwebtoken')
const removeCloudinary = require('../../../utils/removeCloudinary')
const afterTenMinutes = require('../../../utils/afterTenMinutes')
const randomCharacter = require('../../../utils/randomCharacter')
const sendWhatsapp = require('../../../utils/sendWhatsapp')
const { messageLinkVerify, messagePasswordReset } = require('../../../helper/messagePassword')

const loginService = async (nik, password) => {
    const account = await getAccount(nik)    
    if (!account) {
        return new Error('Akun Tidak Ditemukan')
    }
    const check = await bcrypt.compare(password, account.password)    
    if (!check) {
        return new Error('Password Salah')
    }
    const token = jwt.sign({ wargaId: account.wargaId }, JWT_SECRET, { expiresIn: '24h' })
    await updateToken(account.wargaId, token)    

    return { token, account }
}

const profileService = async (wargaId) => {
    const profile = await getProfile(wargaId)
    return profile
}

const updatePictureService = async (wargaId, foto) => {
    const check = await getProfile(wargaId)
    if (!check) {
        return new Error('Akun Tidak Ditemukan')
    }
    if (check.foto) {
        const removePhoto = await removeCloudinary(check.foto, 'profile')
        if (removePhoto instanceof Error) {
            return removePhoto
        }
    }
    const update = await updatePicture(wargaId, foto)
    return update
}

const deletePictureService = async (wargaId) => {
    const check = await getProfile(wargaId)
    if (!check) {
        return new Error('Akun Tidak Ditemukan')
    }
    if (!check.foto) {
        return new Error('Akun Tidak Memiliki Foto')
    }
    if (check.foto) {
        const removePhoto = await removeCloudinary(check.foto, 'profile')
        if (removePhoto instanceof Error) {
            return removePhoto
        }
    }
    const update = await updatePicture(wargaId, null)
    return update
}

const forgotPasswordService = async (nik, baseUrl) => {
    const validateTime = afterTenMinutes()    
    const checkNik = await getAccount(nik)
    if (!checkNik) {
        return new Error('Akun Tidak Ditemukan')
    }
    const checkTime = await getForgotPassword(checkNik.wargaId)    
    if (checkTime) {
        return new Error('Link sudah dikirim, Harap coba kembali setelah 10 menit')
    }
    const token = randomCharacter(69)
    const link = `${baseUrl}/api/user/account/forgot-password/${token}`
    const message = messageLinkVerify(checkNik.namaLengkap, link)
    const forgot = await createForgotPassword(checkNik.wargaId, token, validateTime)
    const send = await sendWhatsapp(checkNik.telepon, message)
    if (send instanceof Error) {
        return send
    }
    return forgot
}

const confirmForgotPasswordService = async (token) => {
    const now = new Date();
    now.setHours(now.getHours() + 7);

    const check = await validateToken(token)
    if (!check) {
        return new Error('Link Tidak Valid')
    }
    if (check.expired < now) {
        return new Error('Link Telah Kadaluarsa')
    }
    if (check.used === true) {
        return new Error('Link Sudah Digunakan')
    }
    const random = randomCharacter(10)
    const password = await bcrypt.hash(random, 10)
    const updatePswd = await updatePassword(check.wargaId, password)
    const set = await setUsedToken(token)
    const message = messagePasswordReset(updatePswd.namaLengkap, random)
    await sendWhatsapp(updatePswd.telepon, message)
    return set
}

const resetPasswordService = async (wargaId, newPassword, oldPassword, confirmPassword) => {
    const acc = await getProfile(wargaId)
    if (!acc) {
        return new Error('Akun Tidak Ditemukan')
    }
    if (newPassword !== confirmPassword) {
        return new Error('Konfirmasi Password Tidak Sesuai')
    }
    if (newPassword.length < 8) {
        return new Error('Password Minimal 8 Karakter')
    }
    const check = await bcrypt.compare(oldPassword, acc.password)
    if (!check) {
        return new Error('Password Lama Tidak Sesuai')
    }
    const hashed = await bcrypt.hash(newPassword, 10)
    const update = await updatePassword(wargaId, hashed)
    return update
}

module.exports = { loginService, profileService, updatePictureService, deletePictureService, forgotPasswordService, confirmForgotPasswordService, resetPasswordService }