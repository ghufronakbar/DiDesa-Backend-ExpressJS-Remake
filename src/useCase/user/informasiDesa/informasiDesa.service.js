const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getInformasiDesa, getPengurusDesa } = require('./informasiDesa.repository')

const getInformasiService = async () => {
    const informasiDesa = await getInformasiDesa()
    const pengurusDesa = await getPengurusDesa()
    for (const pengurus of pengurusDesa) {
        pengurus.warga.foto == null ? pengurus.warga.foto = PROFILE_DEFAULT : pengurus.warga.foto
    }
    return { informasiDesa, pengurusDesa }
}

module.exports = { getInformasiService }