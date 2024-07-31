const { getInformasiDesa, getPengurusDesa } = require('./informasiDesa.repository')

const getInformasiService = async () => {
    const informasiDesa = await getInformasiDesa()
    const pengurusDesa = await getPengurusDesa()
    return { informasiDesa, pengurusDesa }
}

module.exports = { getInformasiService }