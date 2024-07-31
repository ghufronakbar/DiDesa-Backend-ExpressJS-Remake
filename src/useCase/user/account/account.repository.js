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

module.exports = { getAccount, updateToken, getProfile, updatePicture }