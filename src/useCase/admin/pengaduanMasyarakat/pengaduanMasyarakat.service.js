const { getAllPengaduanMasyarakat, countPengaduanMasyarakat, deletePengaduan, getPengaduanMasyarakatById } = require('./pengaduanMasyarakat.repository')

const getPengaduanService = async (page) => {
    const pengaduan = await getAllPengaduanMasyarakat(page)
    const count = await countPengaduanMasyarakat()
    return { pengaduan, count }
}

const getPengaduanByIdService = async (pengaduanId) => {
    const pengaduan = await getPengaduanMasyarakatById(pengaduanId)
    if (!pengaduan) {
        return new Error('Pengaduan tidak ditemukan')
    }
    return pengaduan
}

const deletePengaduanService = async (pengaduanId) => {
    const pengaduanCheck = await getPengaduanMasyarakatById(pengaduanId)
    if (!pengaduanCheck) {
        return new Error('Pengaduan tidak ditemukan')
    }
    const pengaduan = await deletePengaduan(pengaduanId)
    return pengaduan
}

module.exports = { getPengaduanService, deletePengaduanService, getPengaduanByIdService }