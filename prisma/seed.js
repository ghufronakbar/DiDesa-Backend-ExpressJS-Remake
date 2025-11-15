const prisma = require('../src/db/prisma')

const { checkGuest, createGuest } = require('./seedGuest')
const { checkInformasi, createInformasi } = require('./seedInformasi')
const { createJenisUmkm, checkJenisUmkm } = require('./seedJenisUmkm')
const { checkPengurus, createPengurus } = require('./seedPengurus')
const { checkWarga, createWarga, createWargaCalonKetua } = require('./seedWarga')

const seeds = async () => {
    try {
        const warga = await checkWarga()
        const pengurus = await checkPengurus()
        const informasi = await checkInformasi()
        const guest = await checkGuest()
        const jenisUmkm = await checkJenisUmkm()
        const calonKetua = await createWargaCalonKetua()

        let id
        if (warga) {
            const wargaId = await createWarga()
            id = wargaId
            console.log("Warga created with id: ", wargaId)
        } else {
            console.log("Warga already exist")
        }

        if (pengurus) {
            await createPengurus(id)
            console.log("Pengurus created")
        } else {
            console.log("Pengurus already exist")
        }

        if (informasi) {
            await createInformasi()
            console.log("Informasi created")
        } else {
            console.log("Informasi already exist")
        }

        if (guest) {
            await createGuest()
            console.log("Guest created")
        } else {
            console.log("Guest already exist")
        }

        if (jenisUmkm) {
            await createJenisUmkm()
            console.log("JenisUmkm created")
        } else {
            console.log("JenisUmkm already exist")
        }

    } catch (error) {
        console.log(error)
    }
}
seeds().then(() => {
    prisma.$disconnect()
}).catch((error) => {
    console.log(error)
    prisma.$disconnect()
    process.exit(1)
})