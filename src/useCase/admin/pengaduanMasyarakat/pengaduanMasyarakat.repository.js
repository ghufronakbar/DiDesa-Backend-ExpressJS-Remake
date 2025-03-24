const prisma = require('../../../db/prisma')

const getAllPengaduanMasyarakat = async (page) => {
    const pengaduan = await prisma.pengaduanMasyarakat.findMany({
        skip: (page - 1) * 10,
        take: 10,
        orderBy: {
            pengaduanMasyarakatId: 'desc'
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    telepon: true
                }
            }
        }
    })
    return pengaduan
}

const countPengaduanMasyarakat = async () => {
    const count = await prisma.pengaduanMasyarakat.count()
    return count
}

const getPengaduanMasyarakatById = async (pengaduanMasyarakatId) => {
    const pengaduan = await prisma.pengaduanMasyarakat.findFirst({
        where: {
            pengaduanMasyarakatId
        },
        include: {
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    telepon: true
                }
            }
        }
    })
    return pengaduan
}

const deletePengaduan = async (pengaduanMasyarakatId) => {
    const pengaduan = await prisma.pengaduanMasyarakat.delete({
        where: {
            pengaduanMasyarakatId
        }
    })
    return pengaduan
}

const setStatus = async (pengaduanMasyarakatId, status, jawaban) => {
    const pengaduan = await prisma.pengaduanMasyarakat.update({
        where: {
            pengaduanMasyarakatId
        },
        data: {
            status,
            pending: false,
            jawaban
        }
    })
}

module.exports = { getAllPengaduanMasyarakat, countPengaduanMasyarakat, deletePengaduan, getPengaduanMasyarakatById, setStatus }