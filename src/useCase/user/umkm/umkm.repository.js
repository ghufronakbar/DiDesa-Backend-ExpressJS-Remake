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

const getJenisUmkmById = async (jenisUmkmId) => {
    const umkm = await prisma.jenisUmkm.findFirst({
        where: {
            jenisUmkmId
        }
    })
    return umkm
}

const createUmkm = async (nama, deskripsi, lokasi, gambar, jenisUmkmId, wargaId) => {
    const umkm = await prisma.umkm.create({
        data: {
            nama,
            deskripsi,
            lokasi,
            gambar,
            jenisUmkmId,
            wargaId
        }
    })
    return umkm
}

const getUmkmById = async (umkmId) => {
    const umkm = await prisma.umkm.findFirst({
        where: {
            umkmId
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

const setStatusUmkm = async (umkmId, status) => {
    const umkm = await prisma.umkm.update({
        where: {
            umkmId
        },
        data: {
            status
        }
    })
    return umkm
}

const editUmkm = async (umkmId, data) => {
    const umkm = await prisma.umkm.update({
        where: {
            umkmId
        },
        data
    })
    return umkm
}

const deleteUmkm = async (umkmId) => {
    const umkm = await prisma.umkm.delete({
        where: {
            umkmId
        }
    })
    return umkm
}

module.exports = { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm, createUmkm, getJenisUmkmById, getUmkmById, setStatusUmkm, editUmkm, deleteUmkm }