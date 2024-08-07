const prisma = require('../../../db/prisma')

const getInformasi = async () => {
    const informasi = await prisma.informasiDesa.findMany()
    return informasi[0]
}

const editInformasi = async (namaDesa, deskripsi, lahanPertanian, lahanPeternakan, luasWilayah) => {
    const edit = await prisma.informasiDesa.updateMany({
        data: {
            namaDesa,
            deskripsi,
            lahanPertanian,
            lahanPeternakan,
            luasWilayah
        }
    })
    return edit
}

module.exports = { getInformasi, editInformasi }