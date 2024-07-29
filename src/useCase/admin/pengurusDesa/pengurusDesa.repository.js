const prisma = require('../../../db/prisma')

const getAllPengurus = async (page) => {
    const pengurus = await prisma.pengurusDesaAnggota.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            pengurusDesaAnggotaId: 'desc'
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    nik: true,
                    telepon: true
                }
            }
        }
    })
    return pengurus
}

const getPengurusById = async (pengurusDesaAnggotaId) => {
    const pengurus = await prisma.pengurusDesaAnggota.findFirst({
        where: {
            pengurusDesaAnggotaId
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    nik: true,
                    telepon: true
                }
            }
        }
    })
    return pengurus
}

const setAdminAccessPengurus = async (pengurusDesaAnggotaId, aksesAdmin) => {
    const pengurus = await prisma.pengurusDesaAnggota.update({
        where: {
            pengurusDesaAnggotaId
        },
        data: {
            aksesAdmin
        }
    })
    return pengurus
}

const setJabatanPengurus = async (pengurusDesaAnggotaId, jabatan) => {
    const pengurus = await prisma.pengurusDesaAnggota.update({
        where: {
            pengurusDesaAnggotaId
        },
        data: {
            jabatan
        }
    })
    return pengurus
}

const deletePengurus = async (pengurusDesaAnggotaId) => {
    const pengurus = await prisma.pengurusDesaAnggota.delete({
        where: {
            pengurusDesaAnggotaId
        }
    })
    return pengurus
}

const getCountPengurus = async () => {
    const pengurus = await prisma.pengurusDesaAnggota.count()
    return pengurus
}

const getCountPengurusAdmin = async () => {
    const pengurus = await prisma.pengurusDesaAnggota.count({
        where: {
            aksesAdmin: true
        }
    })
    return pengurus
}

const createPengurus = async (wargaId, jabatan) => {
    const pengurus = await prisma.pengurusDesaAnggota.create({
        data: {
            wargaId,
            jabatan
        }
    })
    return pengurus
}

const getWargaById = async (wargaId) => {
    const warga = await prisma.warga.findFirst({
        where: {
            wargaId
        }
    })
    return warga
}

module.exports = { getAllPengurus, getPengurusById, setAdminAccessPengurus, setJabatanPengurus, deletePengurus, getCountPengurus, getCountPengurusAdmin, createPengurus, getWargaById }