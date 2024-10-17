const { showBerita, showBeritaById, postBerita, editBerita, deleteBeritaById, editPrioritasById, editPublikasiById } = require('./berita.service');

const berita = async (req, res) => {
    const { page } = req.query
    try {
        const queryPage = page ? Number(page) : 1
        if (isNaN(queryPage)) return res.status(400).json({ status: 400, message: 'Parameter page harus berupa angka' })
        const { berita, count } = await showBerita(queryPage)
        const pagination = {
            currentPage: queryPage,
            totalPage: Math.ceil(count / 10),
            currentData: berita.length,
            totalData: count
        }
        return res.status(200).json({ status: 200, message: 'Berita', pagination, data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const beritaById = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const berita = await showBeritaById(Number(id))
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        return res.status(200).json({ status: 200, message: 'Berita', data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const addBerita = async (req, res) => {
    const { judul, isi, subjudul } = req.body
    if (!req.file) {
        return res.status(400).json({ status: 400, message: 'Gambar wajib diisi' })
    }
    const gambar = req.file.path
    try {
        if (!judul || !isi || !subjudul) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const berita = await postBerita(judul, isi, subjudul, gambar)
        return res.status(200).json({ status: 200, message: 'Berhasil menambahkan berita', data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editBeritaById = async (req, res) => {
    const { id } = req.params
    const { judul, isi, subjudul } = req.body
    const gambar = req.file ? req.file.path : null
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        if (!id || !judul || !isi || !subjudul) {
            return res.status(400).json({ status: 400, message: 'Semua field wajib diisi' })
        }
        const data = { judul, isi, subjudul }
        if (gambar) data.gambar = gambar
        const berita = await editBerita(Number(id), data)
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil mengedit berita', data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const deleteBerita = async (req, res) => {
    const { id } = req.params
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        const berita = await deleteBeritaById(Number(id))
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        return res.status(200).json({ status: 200, message: 'Berhasil menghapus berita', data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editPublikasi = async (req, res) => {
    const { id } = req.params
    const { publikasi } = req.body
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        let message
        if (publikasi === true) {
            message = 'Berhasil mempublikasikan berita'
        } else if (publikasi === false) {
            message = 'Berhasil menonpublikasikan berita'
        }
        const berita = await editPublikasiById(Number(id), publikasi)
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        return res.status(200).json({ status: 200, message, data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

const editPrioritas = async (req, res) => {
    const { id } = req.params
    const { prioritas } = req.body
    try {
        if (isNaN(Number(id))) {
            return res.status(400).json({ status: 400, message: 'ID Harus berupa angka' })
        }
        let message
        if (prioritas === true) {
            message = 'Berita ditandai sebagai prioritas'
        } else if (prioritas === false) {
            message = 'Berita ditandai sebagai tidak prioritas'
        }
        const berita = await editPrioritasById(Number(id), prioritas)
        if (berita instanceof Error) {
            return res.status(400).json({ status: 400, message: berita.message })
        }
        return res.status(200).json({ status: 200, message, data: berita })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: 'Ada Kesalahan Sistem' })
    }
}

module.exports = { berita, beritaById, addBerita, editBeritaById, deleteBerita, editPublikasi, editPrioritas }