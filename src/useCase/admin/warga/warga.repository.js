const prisma = require('../../../db/prisma')

const getAllWarga = async (page) => {
    const warga = await prisma.warga.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            wargaId: 'desc'
        }
    })
    return warga
}

const countWarga = async () => {
    const count = await prisma.warga.count()
    return count
}

const getWargaById = async (wargaId) => {
    const warga = await prisma.warga.findFirst({
        where: {
            wargaId
        },
        include: {
            umkm: true
        },       
    })
    return warga
}

const checkNikById = async (wargaId, nik) => {
    const warga = await prisma.warga.findFirst({
        where: {
            AND: [
                { nik },
                { NOT: { wargaId } }
            ]

        }
    })
    return warga
}

const checkByNik = async (nik) => {
    const warga = await prisma.warga.findFirst({
        where: {
            nik
        }
    })
    return warga
}

const createWarga = async (nik, kk, namaLengkap, tanggalLahir, password) => {
    const warga = await prisma.warga.create({
        data: {
            nik,
            kk,
            namaLengkap,
            tanggalLahir,
            password,
        }
    })
    return warga
}

const editWarga = async (wargaId, nik, kk, namaLengkap, tanggalLahir) => {
    const warga = await prisma.warga.update({
        where: {
            wargaId
        },
        data: {
            nik,
            kk,
            namaLengkap,
            tanggalLahir,
        }
    })
    return warga
}

const deleteWarga = async (wargaId) => {
    const warga = await prisma.warga.delete({
        where: {
            wargaId
        }
    })
    return warga
}

module.exports = { getAllWarga, countWarga, getWargaById, checkNikById, checkByNik, createWarga, editWarga, deleteWarga }