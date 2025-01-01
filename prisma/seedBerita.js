const prisma = require('../src/db/prisma')

async function createBerita() {
    return await prisma.berita.createMany({
        data: [
            {
                judul: "Putusan Kenaikan PPN 12 Persen",
                subjudul: "Presiden Resmi Umumkan PPN 12 Persen untuk Barang Mewah Tahun Depan",
                isi: `Karena itu seperti yang sudah saya sampaikan sebelumnya dan telah berkoordinasi dengan DPR RI hari ini pemerintah memutuskan bahwa kenaikan tarif PPN dari 11 persen menjadi 12 persen hanya dikenakan terhadap barang dan jasa mewah," kata Prabowo, Selasa.\n\nMisalnya, jet pribadi, kapal pesiar, hingga rumah mewah. "Pesawat jet pribadi itu tergolong barang mewah dimanfaatkan atau digunakan oleh masyarakat papan atas. Kemudian kapal pesiar yatch, kemudian rumah yang sangat mewah yang nilainya di atas golongan menengah," ucap Prabowo. "Artinya untuk barang dan jasa selain yang tergolong barang-barang mewah tidak ada kenaikan PPN," jelas Prabowo lagi.\n\nSebelumnya diberitakan, pemerintah berencana menaikkan PPN sebesar 12 persen dari semula 11 persen mulai tahun 2025. Pemerintah menyebut, kenaikan PPN hanya berlaku untuk barang mewah. Namun, sejumlah barang dan jasa lain rupanya turut menjadi objek kenaikan PPN. Hingga kini, Peraturan Menteri Keuangan (PMK) yang mengatur pemberlakukan tarif pajak pertambahan nilai (PPN) sebesar 12 persen untuk barang dan jasa mewah mulai 1 Januari 2025 belum juga terbit.\n\nPadahal PMK ini diperlukan sebagai aturan teknis pemberlakuan PPN 12 persen. Sejak awal, kenaikan Pajak Pertambahan Nilai (PPN) menjadi 12 persen per 1 Januari 2025, mendapat penolakan luas dari masyarakat. Tak hanya lewat petisi di media sosial, sejumlah elemen masyarakat pun turun ke jalan menyuarakan penolakan terhadap rencana pemerintah menaikkan pungutan pajak ini. Kebijakan ini diprediksi akan memicu lonjakan harga barang dan jasa, yang berpotensi mengubah pola konsumsi masyarakat. Banyak yang khawatir bahwa PPN yang lebih tinggi akan memberikan efek domino yang merugikan`,
                gambar: "/image.png",
                prioritas: true,
                publikasi: true,
                tanggal: new Date("2023-12-31"),
            }
        ]
    })
}


async function main() {
    const berita = await createBerita()
    console.log(berita)
}

main()