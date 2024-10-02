const prisma = require('../../../db/prisma')

const getUmkmLimit = async (limit, search) => {
    const umkm = await prisma.umkm.findMany({
        take: limit,
        where: {
            AND: [
                { approve: true },
                { status: true },
                {
                    nama: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
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

const countUmkm = async (search) => {
    const count = await prisma.umkm.count({
        where: {
            AND: [
                { approve: true },
                { status: true },
                {
                    nama: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        }
    })
    return count
}

const getUmkmByJenis = async (jenisUmkmId, limit, search) => {
    const umkm = await prisma.umkm.findMany({
        where: {
            AND: [
                { approve: true },
                { status: true },
                {
                    jenisUmkmId
                },
                {
                    nama: {
                        contains: search,
                        mode: 'insensitive'
                    }
                }
            ]
        },
        take: limit,
        include: {
            jenisUmkm: true,
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

const countUmkmByJenis = async (jenisUmkmId, search) => {
    const count = await prisma.umkm.count({
        where: {
            AND: [
                { approve: true },
                { status: true },
                {
                    nama: {
                        contains: search,
                        mode: 'insensitive'
                    }
                },
                {
                    jenisUmkmId
                }
            ]
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

const createUmkm = async (nama, deskripsi, lokasi, gambar, latitude, longitude, jenisUmkmId, wargaId) => {
    const umkm = await prisma.umkm.create({
        data: {
            nama,
            deskripsi,
            lokasi,
            gambar,
            jenisUmkmId,
            wargaId,
            latitude,
            longitude
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

const getUmkmByWarga = async (wargaId) => {
    const umkm = await prisma.umkm.findMany({
        where: {
            wargaId
        },
        include: {
            jenisUmkm: true
        }
    })
    return umkm
}

module.exports = { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm, createUmkm, getJenisUmkmById, getUmkmById, setStatusUmkm, editUmkm, deleteUmkm, getUmkmByWarga }