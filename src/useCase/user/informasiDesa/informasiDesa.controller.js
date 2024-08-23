const { getInformasiService } = require('./informasiDesa.service')

const getInformasiController = async (req, res) => {
    const { isLoggedIn } = req.decoded    
    try {
        const { informasiDesa, pengurusDesa } = await getInformasiService()
        return res.status(200).json({ status: 200, isLoggedIn, message: 'Data Informasi Desa', data: { informasiDesa, pengurusDesa } })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, isLoggedIn, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { getInformasiController }