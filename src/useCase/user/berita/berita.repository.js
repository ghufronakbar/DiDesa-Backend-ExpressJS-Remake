const prisma = require('../../../db/prisma')

const getBeritaLimit = async (limit) => {
    const berita = await prisma.berita.findMany({
        take: limit,
        orderBy: {
            tanggal: 'desc'
        },
        where: {
            publikasi: true
        },
        include: {
            _count: {
                select: {
                    komentar: true
                }
            }
        }
    })
    return berita
}

const countBerita = async () => {
    const berita = await prisma.berita.count({
        where: {
            publikasi: true
        }
    })
    return berita
}

const getBeritaPrioritas = async (limit) => {
    const berita = await prisma.berita.findMany({
        where: {
            prioritas: true,
            publikasi: true
        },
        include: {
            _count: {
                select: {
                    komentar: true
                }
            }
        },
        take: limit,
        orderBy: {
            tanggal: 'desc'
        }
    })
    return berita
}

const countBeritaPrioritas = async () => {
    const berita = await prisma.berita.count({
        where: {
            prioritas: true,
            publikasi: true
        }
    })
    return berita
}

const getBeritaPopuler = async (limit) => {
    const berita = await prisma.berita.findMany({
        where: {
            publikasi: true
        },
        include: {
            _count: {
                select: {
                    komentar: true
                }
            }
        },
        orderBy: {
            komentar: {
                _count: 'desc'
            }
        },
        take: limit
    })
    return berita
}

const getDetailBerita = async (beritaId) => {
    const berita = await prisma.berita.findUnique({
        where: {
            beritaId
        },
        include: {
            _count: {
                select: {
                    komentar: true
                }
            },
            komentar: {
                select: {
                    komentarId: true,
                    isi: true,
                    tanggal: true,
                    warga: {
                        select: {
                            wargaId: true,
                            namaLengkap: true,
                            telepon: true,
                            foto: true,
                        }
                    }
                },
                orderBy:{
                    komentarId: 'desc'
                }
            }
        }
    })
    return berita
}


module.exports = { getBeritaLimit, getBeritaPrioritas, countBerita, countBeritaPrioritas, getBeritaPopuler, getDetailBerita }