const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { getPengurusById, updateTokenPengurus } = require('./account.repository')
const { JWT_SECRET } = require('../../../constant')


const authLogin = async (nik, password) => {
    const pengurus = await getPengurusById(nik)
    if (!pengurus) {
        return new Error('NIK tidak terdaftar')
    }
    if(pengurus.aksesAdmin === false) {
        return new Error('Anda bukan admin')
    }
    const isValidPassword = await bcrypt.compare(password, pengurus.warga.password)
    if (!isValidPassword) {
        return new Error('Password salah')
    }
    const token = jwt.sign({ pengurusDesaAnggotaId: pengurus.pengurusDesaAnggotaId }, JWT_SECRET,{expiresIn: '24h'})
    await updateTokenPengurus(pengurus.pengurusDesaAnggotaId, token)
    return token
}

module.exports = { authLogin }