const prisma = require('../../../db/prisma')

const getAllJenisUmkm = async () => {
    const umkm = await prisma.jenisUmkm.findMany({
        orderBy: {
            jenisUmkmId: 'desc'
        },
        select:{
            jenisUmkmId: true,
            namaJenisUmkm: true,
            _count: true
        }
    })
    return umkm
}

const getJenisUmkmById = async (jenisUmkmId) => {
    const umkm = await prisma.jenisUmkm.findFirst({
        where: {
            jenisUmkmId
        }
    })
    return umkm
}

const createJenisUmkm = async (namaJenisUmkm) => {
    const umkm = await prisma.jenisUmkm.create({
        data: {
            namaJenisUmkm
        }
    })
    return umkm
}

const editJenisUmkm = async (jenisUmkmId, namaJenisUmkm) => {
    const umkm = await prisma.jenisUmkm.update({
        where: {
            jenisUmkmId
        },
        data: {
            namaJenisUmkm
        }
    })
    return umkm
}

const deleteJenisUmkm = async (jenisUmkmId) => {
    const umkm = await prisma.jenisUmkm.delete({
        where: {
            jenisUmkmId
        }
    })
    return umkm
}

module.exports = { getAllJenisUmkm, getJenisUmkmById, createJenisUmkm, editJenisUmkm, deleteJenisUmkm }
