const prisma = require('../../../db/prisma')

const getUmkmLimit = async (limit) => {
    const umkm = await prisma.umkm.findMany({
        take: limit,
        where: {
            approve: true,
            status: true
        },
        include: {
            jenisUmkm: true,
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    telepon: true,
                    foto: true,
                }
            }
        }
    })
    return umkm
}

const countUmkm = async () => {
    const count = await prisma.umkm.count({
        where: {
            approve: true,
            status: true
        }
    })
    return count
}

const getUmkmByJenis = async (jenisUmkmId, limit) => {
    const umkm = await prisma.umkm.findMany({
        where: {
            jenisUmkmId,
            approve: true,
            status: true
        },
        take: limit,
        include: {
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    telepon: true,
                    foto: true
                }
            }
        }
    })
    return umkm
}

const countUmkmByJenis = async (jenisUmkmId) => {
    const count = await prisma.umkm.count({
        where: {
            jenisUmkmId,
            approve: true,
            status: true
        }
    })
    return count
}

const getJenisUmkm = async () => {
    const jenisUmkm = await prisma.jenisUmkm.findMany()
    return jenisUmkm
}

module.exports = { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm }