const { getInformasi, editInformasi } = require("./informasiDesa.repository")

const getInformasiDesa = async () => {
    const informasi = await getInformasi()
    return informasi
}

const editInformasiDesa = async (namaDesa, deskripsi, lahanPeternakan, lahanTanaman) => {
    const edit = await editInformasi(namaDesa, deskripsi, lahanPeternakan, lahanTanaman)
    return edit
}

module.exports = { getInformasiDesa, editInformasiDesa }