const prisma = require('../../../db/prisma')

const getAllPemilihan = async () => {
    const pemilihan = await prisma.pemilihanKetua.findMany({
        orderBy: {
            pemilihanKetuaId: 'desc'
        },
        include: {
            _count: true,
            calonKetua: {
                orderBy: {
                    calonKetuaId: 'asc'
                },
                include: {
                    _count: true,
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            nik: true,
                            foto: true,
                            tanggalLahir: true
                        }
                    }
                }
            }
        }
    })
    return pemilihan
}

const getPemilihanById = async (pemilihanKetuaId) => {
    const pemilihan = await prisma.pemilihanKetua.findFirst({
        where: {
            pemilihanKetuaId
        },
        include: {
            _count: true,
            calonKetua: {
                orderBy: {
                    calonKetuaId: 'asc'
                },
                include: {
                    _count: true,
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            nik: true,
                            foto: true,
                            tanggalLahir: true
                        }
                    }
                }
            }
        }
    })
    return pemilihan
}

const createPemilihan = async (judul, deskripsi, tanggalMulai, tanggalSelesai) => {
    const pemilihan = await prisma.pemilihanKetua.create({
        data: {
            judul,
            deskripsi,
            tanggalMulai,
            tanggalSelesai
        }
    })
    return pemilihan
}

const editPemilihan = async (pemilihanKetuaId, judul, deskripsi, tanggalMulai, tanggalSelesai) => {
    const pemilihan = await prisma.pemilihanKetua.update({
        where: {
            pemilihanKetuaId
        },
        data: {
            judul,
            deskripsi,
            tanggalMulai,
            tanggalSelesai
        }
    })
    return pemilihan
}

const deletePemilihan = async (pemilihanKetuaId) => {
    const pemilihan = await prisma.pemilihanKetua.delete({
        where: {
            pemilihanKetuaId
        }
    })
    return pemilihan
}

const createCalon = async (wargaId, pemilihanKetuaId, deskripsi) => {
    const calon = await prisma.calonKetua.create({
        data: {
            wargaId,
            pemilihanKetuaId,
            deskripsi,
        }
    })
    return calon
}

const editCalon = async (calonKetuaId, deskripsi) => {
    const calon = await prisma.calonKetua.update({
        where: {
            calonKetuaId,
        },
        data: {
            deskripsi
        }
    })
    return calon
}

const deleteCalon = async (calonKetuaId) => {
    const calon = await prisma.calonKetua.delete({
        where: {
            calonKetuaId
        }
    })
    return calon
}

const getWargaById = async (wargaId) => {
    const warga = await prisma.warga.findFirst({
        where: {
            wargaId
        }
    })
    return warga
}

const countPemilihanAfterToday = async () => {
    const pemilihan = await prisma.pemilihanKetua.count({
        where: {
            tanggalMulai: {
                gte: new Date()
            },
            tanggalSelesai: {
                gte: new Date()
            }
        },
    })
    return pemilihan
}

const getPemilihanByCalonId = async (calonKetuaId) => {
    const pemilihan = await prisma.calonKetua.findFirst({
        where: {
            calonKetuaId
        },       
    })
    return pemilihan
}




module.exports = {
    getAllPemilihan,
    getPemilihanById,
    createPemilihan,
    editPemilihan,
    deletePemilihan,
    createCalon,
    editCalon,
    deleteCalon,
    getWargaById,
    countPemilihanAfterToday,
    getPemilihanByCalonId
}