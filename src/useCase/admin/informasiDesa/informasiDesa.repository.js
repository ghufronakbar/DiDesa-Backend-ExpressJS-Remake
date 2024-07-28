const prisma = require('../../../db/prisma')

const getInformasi = async () => {
    const informasi = await prisma.informasiDesa.findMany()
    return informasi[0]
}

const editInformasi = async (namaDesa, deskripsi, lahanPeternakan, lahanTanaman) => {
    const edit = await prisma.informasiDesa.update({
        data: {
            namaDesa,
            deskripsi,
            lahanPeternakan,
            lahanTanaman
        }
    })
    return edit
}

module.exports = { getInformasi, editInformasi }