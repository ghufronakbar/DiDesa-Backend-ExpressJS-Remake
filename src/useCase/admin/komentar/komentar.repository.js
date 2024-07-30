const prisma = require('../../../db/prisma')

const getAllKomentar = async (page) => {
    const komentar = await prisma.komentar.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            komentarId: 'desc'
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    nik: true,
                    telepon: true,
                    foto: true,
                    namaLengkap: true
                }
            },
            berita: {
                select: {
                    beritaId: true,
                    judul: true,
                    gambar: true
                }
            }
        }
    })
    return komentar
}

const countKomentar = async () => {
    const komentar = await prisma.komentar.count()
    return komentar
}


const getKomentarById = async (komentarId) => {
    const komentar = await prisma.komentar.findFirst({
        where: {
            komentarId
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    nik: true,
                    telepon: true,
                    foto: true,    
                    namaLengkap: true                
                }
            },
            berita: {
                select: {
                    beritaId: true,
                    judul: true,
                    gambar: true
                }
            }
        }
    })
    return komentar
}

const deleteKomentar = async (komentarId) => {
    const komentar = await prisma.komentar.delete({
        where: {
            komentarId
        }
    })
    return komentar
}

module.exports = { getAllKomentar, getKomentarById, deleteKomentar, countKomentar }