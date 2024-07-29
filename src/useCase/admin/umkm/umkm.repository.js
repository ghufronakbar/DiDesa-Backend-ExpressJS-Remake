const prisma = require('../../../db/prisma')

const getAllUmkm = async (page) => {
    const umkm = await prisma.umkm.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            umkmId: 'desc'
        },
        include:{
            jenisUmkm: true,
            warga:{
                select:{
                    wargaId: true,
                    nik: true,
                    foto: true,
                    namaLengkap: true,
                    telepon: true
                }
            }
        }
    })
    return umkm
}

const countUmkm = async () => {
    const umkm = await prisma.umkm.count()
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
                    nik: true,
                    namaLengkap: true,
                    foto: true,
                    telepon: true
                }
            }
        }
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

const approveUmkm = async (umkmId, approve) => {
    const umkm = await prisma.umkm.update({
        where: {
            umkmId
        },
        data: {
            approve
        }
    })
    return umkm
}

const setInactiveUmkm = async (umkmId) => {
    const umkm = await prisma.umkm.update({
        where: {
            umkmId
        },
        data: {
            approve: false
        }
    })
    return umkm
}

module.exports = { getAllUmkm, countUmkm, getUmkmById, deleteUmkm, approveUmkm, setInactiveUmkm }