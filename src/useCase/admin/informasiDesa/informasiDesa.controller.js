const { getInformasiDesa, editInformasiDesa } = require('./informasiDesa.service');

const informasiDesa = async (req, res) => {
    try {
        const informasi = await getInformasiDesa()
        return res.status(200).json({ status: 200, message: 'Informasi Desa', data: informasi })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editInformasi =  async (req, res) => {
    const { namaDesa, deskripsi, lahanPeternakan, lahanTanaman } = req.body
    try {
        if (!namaDesa || !deskripsi || !lahanPeternakan || !lahanTanaman) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const edit = await editInformasiDesa(namaDesa, deskripsi, lahanPeternakan, lahanTanaman)
        return res.status(200).json({ status: 200, message: 'Informasi Desa', data: edit })
    } catch (error) {
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { informasiDesa, editInformasi }