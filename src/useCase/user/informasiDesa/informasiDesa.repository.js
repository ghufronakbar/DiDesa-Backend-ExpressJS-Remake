const prisma = require('../../../db/prisma')

const getInformasiDesa = async () => {
    const informasiDesa = await prisma.informasiDesa.findMany()
    return informasiDesa[0]
}

const getPengurusDesa = async () => {
    const pengurusDesa = await prisma.pengurusDesaAnggota.findMany({
        select: {
            pengurusDesaAnggotaId: true,
            wargaId: true,
            aksesAdmin: true,
            jabatan: true,
            warga: {
                select: {
                    wargaId: true,
                    namaLengkap: true,
                    telepon: true,
                    foto: true,
                    kk: true,
                    tanggalLahir: true
                }
            }
        }
    })
    return pengurusDesa
}

module.exports = { getInformasiDesa, getPengurusDesa }