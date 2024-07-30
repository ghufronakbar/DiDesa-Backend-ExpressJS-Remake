const prisma = require('../../../db/prisma')

const getInformasi = async () => {
    const informasi = await prisma.informasiDesa.findMany()
    return informasi[0]
}

const editInformasi = async (namaDesa, deskripsi, lahanPertanian, lahanPeternakan) => {
    const edit = await prisma.informasiDesa.update({
        data: {
            namaDesa,
            deskripsi,
            lahanPertanian,
            lahanPeternakan,
        }
    })
    return edit
}

module.exports = { getInformasi, editInformasi }