const { getAllPengurus, getPengurusById, setAdminAccessPengurus, setJabatanPengurus, deletePengurus, getCountPengurus, getCountPengurusAdmin, createPengurus, getWargaById } = require('./pengurusDesa.repository')

const getAllPengurusService = async (page) => {
    const pengurus = await getAllPengurus(page)
    const count = await getCountPengurus()
    return { pengurus, count }
}

const getPengurusByIdService = async (pengurusDesaAnggotaId) => {
    const pengurus = await getPengurusById(pengurusDesaAnggotaId)
    return pengurus
}

const setAdminAccessPengurusService = async (pengurusDesaAnggotaId, aksesAdmin) => {
    const check = await getPengurusById(pengurusDesaAnggotaId)
    if (!check) {
        return new Error('Pengurus Desa Tidak Ditemukan')
    }
    const checkAdmin = await getCountPengurusAdmin()
    if (checkAdmin === 1 && aksesAdmin === false) {
        return new Error('Setidaknya harus ada 1 Admin')
    }
    const pengurus = await setAdminAccessPengurus(pengurusDesaAnggotaId, aksesAdmin)
    return pengurus
}

const setJabatanPengurusService = async (pengurusDesaAnggotaId, jabatan) => {
    const check = await getPengurusById(pengurusDesaAnggotaId)
    if (!check) {
        return new Error('Pengurus Desa Tidak Ditemukan')
    }
    const pengurus = await setJabatanPengurus(pengurusDesaAnggotaId, jabatan)
    return pengurus
}

const deletePengurusService = async (pengurusDesaAnggotaId) => {
    const check = await getPengurusById(pengurusDesaAnggotaId)
    const checkAll = await getCountPengurus()
    if (!check) {
        return new Error('Pengurus Desa Tidak Ditemukan')
    }
    if (check.aksesAdmin === true) {
        return new Error('Tidak Bisa Menghapus Admin')
    }
    if (checkAll === 1) {
        return new Error('Tidak Bisa Menghapus Keseluruhan Pengurus Desa')
    }

    const pengurus = await deletePengurus(pengurusDesaAnggotaId)
    return pengurus
}

const createPengurusService = async (data) => {
    const warga = await getWargaById(data.wargaId)
    if (!warga) {
        return new Error('Warga Tidak Ditemukan')
    }
    if(warga.pengurusDesaAnggota.pengurusDesaAnggotaId){
        return new Error('Warga Sudah Menjadi Pengurus Desa')
    }
    const pengurus = await createPengurus(data)
    return pengurus
}

module.exports = { getAllPengurusService, getPengurusByIdService, setAdminAccessPengurusService, setJabatanPengurusService, deletePengurusService, createPengurusService }