const prisma = require('../../../db/prisma')

const getAccount = async (nik) => {
    const account = await prisma.warga.findFirst({
        where: {
            nik
        }
    })
    return account
}

const updateToken = async (wargaId, token) => {
    const update = await prisma.warga.update({
        where: {
            wargaId
        },
        data: {
            token
        }
    })
    return update
}

const getProfile = async (wargaId) => {
    const profile = await prisma.warga.findFirst({
        where: {
            wargaId
        },
        select: {
            wargaId: true,
            telepon: true,
            nik: true,
            kk: true,
            namaLengkap: true,
            tanggalLahir: true,
            foto: true,
            pengaduanMasyarakat: true,
            password: true,
            _count: {
                select: {
                    pengaduanMasyarakat: true,
                    umkm: true
                }
            },
            umkm: {
                select: {
                    umkmId: true,
                    nama: true,
                    deskripsi: true,
                    approve: true,
                    status: true,
                    gambar: true,
                    lokasi: true,
                    jenisUmkm: {
                        select: {
                            jenisUmkmId: true,
                            namaJenisUmkm: true
                        }
                    }
                }
            }
        }
    })
    return profile
}

const updatePicture = async (wargaId, foto) => {
    const update = await prisma.warga.update({
        where: {
            wargaId
        },
        data: {
            foto
        }
    })
    return update
}

const createForgotPassword = async (wargaId, token, expired) => {
    const forgot = await prisma.forgotPassword.create({
        data: {
            wargaId,
            token,
            expired
        }
    })
}

const getForgotPassword = async (wargaId, time) => {
    const forgot = await prisma.forgotPassword.count({
        where: {
            AND: [
                {
                    wargaId
                },
                {
                    expired:
                    {
                        lte: time,
                        gte: new Date()
                    }
                }
            ]
        }
    })
    return forgot
}

const validateToken = async (token) => {
    const validate = await prisma.forgotPassword.findFirst({
        where: {
            token
        }
    })
    return validate
}

const setUsedToken = async (token) => {
    const update = await prisma.forgotPassword.updateMany({
        where: {
            token
        },
        data: {
            used: true
        }
    })
    return update
}

const updatePassword = async (wargaId, password) => {
    const update = await prisma.warga.update({
        where: {
            wargaId
        },
        data: {
            password
        }
    })
    return update
}


module.exports = { getAccount, updateToken, getProfile, updatePicture, createForgotPassword, getForgotPassword, validateToken, setUsedToken, updatePassword }