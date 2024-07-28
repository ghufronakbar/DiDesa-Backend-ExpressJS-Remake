const { removeCloudinary } = require("../../../utils/removeCloudinary")
const { getAllBerita, getBeritaById, createBerita, updateBerita, deleteBerita, publikasiBerita, prioritasBerita, countBerita } = require("./berita.repository")

const showBerita = async (page) => {
    const berita = await getAllBerita(page)
    const count = await countBerita()
    return { berita, count }
}

const showBeritaById = async (id) => {
    const berita = await getBeritaById(id)
    if (!berita) {
        return new Error('Berita tidak ditemukan')
    }
    return berita
}

const postBerita = async (judul, isi, subjudul, gambar) => {
    const berita = await createBerita(judul, isi, subjudul, gambar)
    return berita
}

const editBerita = async (id, data) => {
    const beritaId = await getBeritaById(id)
    if (!beritaId) {
        return new Error('Berita tidak ditemukan')
    }
    if ( data.gambarl && beritaId.gambar) {
        const removeImage = await removeCloudinary(beritaId.gambar, "berita")
        if (removeImage instanceof Error) {
            return removeImage
        }
    }
    const berita = await updateBerita(id, data)
    return berita
}

const deleteBeritaById = async (id) => {
    const beritaId = await getBeritaById(id)
    if (!beritaId) {
        return new Error('Berita tidak ditemukan')
    }
    if (beritaId.gambar) {
        const removeImage = await removeCloudinary(beritaId.gambar, "berita")
        if (removeImage instanceof Error) {
            return removeImage
        }
    }
    const berita = await deleteBerita(id)
    return berita
}

const editPublikasiById = async (id, publikasi) => {
    const beritaId = await getBeritaById(id)
    if (!beritaId) {
        return new Error('Berita tidak ditemukan')
    }
    const berita = await publikasiBerita(id, publikasi)
    return berita
}

const editPrioritasById = async (id, prioritas) => {
    const beritaId = await getBeritaById(id)
    if (!beritaId) {
        return new Error('Berita tidak ditemukan')
    }
    const berita = await prioritasBerita(id, prioritas)
    return berita
}

module.exports = { showBerita, showBeritaById, postBerita, editBerita, deleteBeritaById, editPublikasiById, editPrioritasById }