const prisma = require('../../../db/prisma')

const getAllPemilihan = async () => {
    const pemilihan = await prisma.pemilihanKetua.findMany({
        include: {
            _count: {
                select: {
                    calonKetua: true
                }
            },
            calonKetua: {
                select: {
                    calonKetuaId: true,
                    deskripsi: true,

                    _count: {
                        select: {
                            vote: true
                        }
                    },
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            telepon: true,
                            nik: true,
                            kk: true,
                            tanggalLahir: true,
                            foto: true
                        }
                    }

                },

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
            _count: {
                select: {
                    calonKetua: true
                }
            },
            calonKetua: {
                include: {
                    _count: {
                        select: {
                            vote: true
                        }
                    },
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            telepon: true,
                            nik: true,
                            kk: true,
                            tanggalLahir: true,
                            foto: true
                        }
                    }
                }
            }
        }
    })
    return pemilihan
}

const checkVote = async (wargaId, calonKetuaId) => {
    const check = await prisma.vote.count({
        where: {
            AND: [
                { wargaId },
                { calonKetuaId }
            ]
        },

    })
    return check
}

const doVote = async (wargaId, calonKetuaId) => {
    const vote = await prisma.vote.create({
        data: {
            wargaId,
            calonKetuaId
        }
    })
    return vote
}

const getPemilihanByCalonId = async (calonKetuaId) => {
    const pemilihan = await prisma.pemilihanKetua.findFirst({
        where: {
            calonKetua: {
                some: {
                    calonKetuaId
                }
            }
        }
    })
    return pemilihan
}

const getCalonById = async (calonKetuaId) => {
    const calon = await prisma.calonKetua.findFirst({
        where: {
            calonKetuaId
        },

    })
    return calon
}

const getCalonByPemilihanId = async (pemilihanKetuaId) => {
    const calon = await prisma.calonKetua.findMany({
        where: {
            pemilihanKetuaId
        }
    })
    return calon
}

const getLatestPemilihan = async () => {
    const pemilihan = await prisma.pemilihanKetua.findMany({
        orderBy: {
            pemilihanKetuaId: 'desc'
        },
        take: 1,
        include: {
            _count: {
                select: {
                    calonKetua: true
                }
            },
            calonKetua: {
                select: {
                    calonKetuaId: true,
                    deskripsi: true,

                    _count: {
                        select: {
                            vote: true
                        }
                    },
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            telepon: true,
                            nik: true,
                            kk: true,
                            tanggalLahir: true,
                            foto: true
                        }
                    }

                },

            }
        }
    })
    return pemilihan.length > 0 ? pemilihan[0] : null
}

const getWargaById = async (wargaId) => {
    const warga = await prisma.warga.findFirst({
        where: {
            wargaId
        }
    })
    return warga
}

module.exports = { getAllPemilihan, getPemilihanById, checkVote, doVote, getPemilihanByCalonId, getCalonById, getCalonByPemilihanId, getLatestPemilihan, getWargaById }