const { PROFILE_DEFAULT } = require('../../../constant/imageDefault')
const { getAllPemilihan, getPemilihanById, checkVote, doVote, getPemilihanByCalonId, getCalonById, getCalonByPemilihanId, getLatestPemilihan } = require('./pemilihan.repository')

const getAllPemilihanService = async (wargaId) => {
    const pemilihan = await getAllPemilihan()
    for (const p of pemilihan) {
        p.isVoted = false
        for (const c of p.calonKetua) {
            const isVoted = await checkVote(parseInt(wargaId), c.calonKetuaId)
            if (isVoted) {
                p.isVoted = true
            }
        }
        if (p.tanggalMulai < new Date() && p.tanggalSelesai > new Date()) {
            p.isVoteable = true
            p.status = 'Sedang Berlangsung'
        } else if (p.tanggalSelesai < new Date()) {
            p.isVoteable = false
            p.status = 'Selesai'
        } else if (p.tanggalMulai > new Date()) {
            p.isVoteable = false
            p.status = 'Belum Berlangsung'
        }
    }
    return pemilihan
}

const getPemilihanByIdService = async (wargaId, id) => {
    const pemilihan = await getPemilihanById(parseInt(id))
    if (!pemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    pemilihan.isVoted = false
    for (const c of pemilihan.calonKetua) {
        const isVoted = await checkVote(parseInt(wargaId), c.calonKetuaId)
        if (isVoted) {
            pemilihan.isVoted = true
        }
    }
    if (pemilihan.tanggalMulai < new Date() && pemilihan.tanggalSelesai > new Date()) {
        pemilihan.isVoteable = true
        pemilihan.status = 'Sedang Berlangsung'
    } else if (pemilihan.tanggalSelesai < new Date()) {
        pemilihan.isVoteable = false
        pemilihan.status = 'Selesai'
    } else if (pemilihan.tanggalMulai > new Date()) {
        pemilihan.isVoteable = false
        pemilihan.status = 'Belum Berlangsung'
    }
    return pemilihan
}

const doVoteService = async (wargaId, calonKetuaId) => {

    const [cCalon, cPemilihan] = await Promise.all([
        getCalonById(parseInt(calonKetuaId)),
        getPemilihanByCalonId(parseInt(calonKetuaId))
    ])
    console.log(cCalon, cPemilihan)
    if (!cCalon) {
        return new Error('Calon Tidak Ditemukan')
    }
    if (!cPemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    if (cPemilihan.tanggalSelesai < new Date() && cPemilihan.tanggalMulai < new Date()) {
        return new Error('Pemilihan Telah Selesai')
    }
    if (cPemilihan.tanggalMulai > new Date() && cPemilihan.tanggalSelesai > new Date()) {
        return new Error('Pemilihan Belum Dimulai')
    }

    const getAllCalon = await getCalonByPemilihanId(cCalon.pemilihanKetuaId)
    for (const c of getAllCalon) {
        const check = await checkVote(parseInt(wargaId), c.calonKetuaId)
        if (check) {
            return new Error('Anda Sudah Memilih Dalam Pemilihan Ini')
        }
    }

    const pemilihan = await doVote(parseInt(wargaId), parseInt(calonKetuaId))
    return pemilihan
}

const getLatestPemilihanService = async (wargaId) => {
    const pemilihan = await getLatestPemilihan()
    if (!pemilihan) {
        return new Error('Pemilihan Tidak Ditemukan')
    }
    pemilihan.isVoted = false
    for (const c of pemilihan.calonKetua) {
        const isVoted = await checkVote(parseInt(wargaId), c.calonKetuaId)
        if (isVoted) {
            pemilihan.isVoted = true
        }
        c.warga.foto === null ? c.warga.foto = PROFILE_DEFAULT : c.warga.foto
    }
    if (pemilihan.tanggalMulai < new Date() && pemilihan.tanggalSelesai > new Date()) {
        pemilihan.isVoteable = true
        pemilihan.status = 'Sedang Berlangsung'
    } else if (pemilihan.tanggalSelesai < new Date()) {
        pemilihan.isVoteable = false
        pemilihan.status = 'Selesai'
    } else if (pemilihan.tanggalMulai > new Date()) {
        pemilihan.isVoteable = false
        pemilihan.status = 'Belum Berlangsung'
    }
    return pemilihan
}

module.exports = { getAllPemilihanService, getPemilihanByIdService, doVoteService, getLatestPemilihanService }


