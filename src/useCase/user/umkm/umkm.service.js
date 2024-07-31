const { getUmkmLimit, countUmkm, getUmkmByJenis, countUmkmByJenis, getJenisUmkm } = require('./umkm.repository')

const getUmkmLimitService = async (limit) => {
    const umkm = await getUmkmLimit(parseInt(limit))
    const count = await countUmkm()
    return { umkm, count }
}

const getUmkmByJenisService = async (id, limit) => {
    const umkm = await getUmkmByJenis(parseInt(id), parseInt(limit))
    const count = await countUmkmByJenis(parseInt(id))
    return { umkm, count }
}

const getJenisUmkmService = async () => {
    const umkm = await getJenisUmkm()
    return umkm
}

module.exports = { getUmkmLimitService, getUmkmByJenisService, getJenisUmkmService }