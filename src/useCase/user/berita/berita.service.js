const { getBeritaLimit, getBeritaPrioritas, countBerita, countBeritaPrioritas, getBeritaPopuler, getDetailBerita } = require('./berita.repository')

const getBeritaLimitService = async (limit, search) => {
    const berita = await getBeritaLimit(Number(limit), search)
    const count = await countBerita(search)
    return { berita, count }
}

const getBeritaPrioritasService = async (limit) => {
    const berita = await getBeritaPrioritas(Number(limit))
    const count = await countBeritaPrioritas()
    return { berita, count }
}

const getBeritaPopulerService = async (limit) => {
    const berita = await getBeritaPopuler(Number(limit))
    const count = await countBerita("")
    return { berita, count }
}

const getDetailBeritaService = async (id) => {
    const berita = await getDetailBerita(Number(id))
    if (!berita) {
        return new Error('Data Berita Tidak Ditemukan')
    }
    return berita
}

module.exports = { getBeritaLimitService, getBeritaPrioritasService, getBeritaPopulerService, getDetailBeritaService }