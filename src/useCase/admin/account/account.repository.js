const prisma = require('../../../db/prisma')

const getPengurusById = async (nik) => {
    const pengurus = await prisma.pengurusDesaAnggota.findFirst({
        where: {
            warga:{
                nik
            }
        },
        select: {
            pengurusDesaAnggotaId: true,
            wargaId: true,
            aksesAdmin: true,
            warga:{
                select:{
                    password: true
                }
            }
        }
    })
    return pengurus
}

const updateTokenPengurus = async (pengurusDesaAnggotaId, token) => {
    const pengurus = await prisma.pengurusDesaAnggota.update({
        where: {
            pengurusDesaAnggotaId
        },
        data: {
            token
        }
    })
    return pengurus
}


module.exports = {
    getPengurusById,
    updateTokenPengurus
}