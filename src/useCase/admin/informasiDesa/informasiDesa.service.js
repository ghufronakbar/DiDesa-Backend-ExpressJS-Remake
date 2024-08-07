const { getInformasi, editInformasi } = require("./informasiDesa.repository")

const getInformasiDesa = async () => {
    const informasi = await getInformasi()
    return informasi
}

const editInformasiDesa = async (namaDesa, deskripsi, lahanPertanian, lahanPeternakan, luasWilayah) => {
    const edit = await editInformasi(namaDesa, deskripsi, lahanPertanian, lahanPeternakan, luasWilayah)
    return edit
}

module.exports = { getInformasiDesa, editInformasiDesa }