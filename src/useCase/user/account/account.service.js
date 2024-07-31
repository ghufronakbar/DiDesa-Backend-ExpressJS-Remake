const { getAccount, updateToken, getProfile, updatePicture } = require('./account.repository')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../../../constant')
const jwt = require('jsonwebtoken')
const removeCloudinary = require('../../../utils/removeCloudinary')

const loginService = async (nik, password) => {
    const account = await getAccount(nik)
    if (!account) {
        return new Error('Akun Tidak Ditemukan')
    }
    const check = await bcrypt.compare(password, account.password)
    if (!check) {
        return new Error('Password Salah')
    }
    const token = jwt.sign({ wargaId: account.wargaId }, JWT_SECRET,{expiresIn: '24h'})
    await updateToken(account.wargaId, token)
    return token
}

const profileService = async (wargaId) => {
    const profile = await getProfile(wargaId)
    return profile
}

const updatePictureService = async (wargaId, foto) => {
    const check = await getProfile(wargaId)
    if(!check) {
        return new Error('Akun Tidak Ditemukan')
    }
    if(check.foto){
        const removePhoto = await removeCloudinary(check.foto, 'profile')
        if(removePhoto instanceof Error) {
            return removePhoto
        }
    }    
    const update = await updatePicture(wargaId, foto)
    return update
}

const deletePictureService = async (wargaId) => {
    const check = await getProfile(wargaId)
    if(!check) {
        return new Error('Akun Tidak Ditemukan')
    }
    if(!check.foto){
        return new Error('Akun Tidak Memiliki Foto')
    }
    if(check.foto){
        const removePhoto = await removeCloudinary(check.foto, 'profile')
        if(removePhoto instanceof Error) {
            return removePhoto
        }
    }    
    const update = await updatePicture(wargaId, null)
    return update
}

module.exports = { loginService, profileService, updatePictureService, deletePictureService }