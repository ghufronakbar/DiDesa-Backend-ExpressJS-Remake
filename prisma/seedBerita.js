const prisma = require('../src/db/prisma')

const dataBerita = [
    {
        judul: "Putusan Kenaikan PPN 12 Persen",
        subjudul: "Presiden Resmi Umumkan PPN 12 Persen untuk Barang Mewah Tahun Depan",
        isi: `Karena itu seperti yang sudah saya sampaikan sebelumnya dan telah berkoordinasi dengan DPR RI hari ini pemerintah memutuskan bahwa kenaikan tarif PPN dari 11 persen menjadi 12 persen hanya dikenakan terhadap barang dan jasa mewah," kata Prabowo, Selasa.\n\nMisalnya, jet pribadi, kapal pesiar, hingga rumah mewah. "Pesawat jet pribadi itu tergolong barang mewah dimanfaatkan atau digunakan oleh masyarakat papan atas. Kemudian kapal pesiar yatch, kemudian rumah yang sangat mewah yang nilainya di atas golongan menengah," ucap Prabowo. "Artinya untuk barang dan jasa selain yang tergolong barang-barang mewah tidak ada kenaikan PPN," jelas Prabowo lagi.\n\nSebelumnya diberitakan, pemerintah berencana menaikkan PPN sebesar 12 persen dari semula 11 persen mulai tahun 2025. Pemerintah menyebut, kenaikan PPN hanya berlaku untuk barang mewah. Namun, sejumlah barang dan jasa lain rupanya turut menjadi objek kenaikan PPN. Hingga kini, Peraturan Menteri Keuangan (PMK) yang mengatur pemberlakukan tarif pajak pertambahan nilai (PPN) sebesar 12 persen untuk barang dan jasa mewah mulai 1 Januari 2025 belum juga terbit.\n\nPadahal PMK ini diperlukan sebagai aturan teknis pemberlakuan PPN 12 persen. Sejak awal, kenaikan Pajak Pertambahan Nilai (PPN) menjadi 12 persen per 1 Januari 2025, mendapat penolakan luas dari masyarakat. Tak hanya lewat petisi di media sosial, sejumlah elemen masyarakat pun turun ke jalan menyuarakan penolakan terhadap rencana pemerintah menaikkan pungutan pajak ini. Kebijakan ini diprediksi akan memicu lonjakan harga barang dan jasa, yang berpotensi mengubah pola konsumsi masyarakat. Banyak yang khawatir bahwa PPN yang lebih tinggi akan memberikan efek domino yang merugikan`,
        gambar: "/image.png",
        prioritas: true,
        publikasi: true,
        tanggal: new Date("2023-12-31"),
    },
    {
        beritaId: 37,
        judul: 'Kabar Terbaru IKN: PBNU Beli Tanah 100 Ha dan Biaya Pemeliharaan Infrastruktur Rp 26 Triliun',
        subjudul: 'Pengurus Besar Nahdlatul Ulama (PBNU) berencana membeli 100 hektare lahan di Ibu Kota Nusantara (IKN), Kalimantan Timur, untuk membangun fasilitas dan kantor untuk PBNU hingga peluang bisnis bagi organisasi.',
        tanggal: '2024-08-22T20:26:29.234Z',
        isi: '"Insya Allah kami ingin membeli tanah di IKN itu, ya mudah-mudahan bisa sampai 100 hektare misalnya, untuk kemudian kami gunakan untuk membangun sejumlah fasilitas organisasi," kata Ketua Umum PBNU Yahya Cholil Staquf saat memberi keterangan usai bertemu Presiden Jokowi di Istana Kepresidenan Jakarta, Kamis, 22 Agustus 2024.\r\n' +
            '\r\n' +
            'Hal itu disampaikan Gus Yahya, sapaan akrabnya, usai menemui Presiden Jokowi yang berlangsung selama hampir satu setengah jam.\r\n' +
            '\r\n' +
            'Gus Yahya mengatakan Presiden Jokowi merestui rencana PBNU tersebut untuk membangun fasilitas pendidikan, kesehatan dan keagamaan di IKN.\r\n' +
            '\r\n' +
            'Presiden Jokowi pun, kata Gus Yahya, memberikan saran terkait lokasi lahan yang bagus yang bisa dibeli oleh NU di IKN. Oleh karenanya, PBNU segera berkomunikasi dengan Otorita IKN untuk membahas lebih lanjut rencana tersebut.\r\n' +
            '\r\n' +
            '"Ada sejumlah saran beliau mengenai lokasi yang bagus untuk bisa dibeli oleh NU di IKN. Kemudian fasilitas-fasilitas apa yang mungkin bisa dibangun oleh NU di IKN," kata Gus Yahya.\r\n' +
            '\r\n' +
            'Selain membangun fasilitas, PBNU juga mempertimbangkan potensi bisnis di IKN dengan modal yang diperkirakan mencapai Rp2 triliun sampai Rp3 triliun.\r\n' +
            '\r\n' +
            '"Yang sekarang kami punya adalah gagasan mengenai konsolidasi kapital untuk itu. Gimana caranya? Nah nilainya masih akan kita hitung, ya mungkin kita butuh sekitar dua atau tiga triliun rupiah," kata Gus Yahya.\r\n' +
            '\r\n' +
            'Gus Yahya menambahkan bahwa NU meyakini pembangunan di IKN sebuah gagasan penting yang harus didukung, terutama dengan landasan undang-undang yang memastikan keberlanjutan pembangunan di IKN.\r\n' +
            '\r\n' +
            'Di luar rencana PBNU, Otorita IKN pada September mendatang akan menggelar peletakan batu pertama atau groundbreaking tahap ke-8 yang melibatkan 7 investor.\r\n' +
            '\r\n' +
            '"Ada tujuh, ada tujuh investor yang mau groundbreaking (di IKN)," kata Menteri PUPR yang juga Plt Kepala OIKN Basuki Hadimuljono di Jakarta, Rabu.\r\n' +
            '\r\n' +
            'Tujuh investor tersebut di antaranya bangunan pendidikan dan hotel. "(Sektor yang groundbreaking) ada pendidikan, hotel, properti, sport center," ungkap Basuki.\r\n' +
            '\r\n' +
            'Meski begitu, Basuki tak menyebutkan jumlah nilai investasi groundbreaking tersebut. "Belum tahu (nilai investasinya)," imbuh Basuki.\r\n' +
            '\r\n' +
            'OIKN juga mencatat, terdapat total 45 investor yang telah melangsungkan prosesi peletakan batu pertama atau groundbreaking pada tahap 1 sampai dengan tahap 6. Sedangkan pada groundbreaking tahap 7 yang dilaksanakan 12 Agustus 2024 melibatkan empat investor.\r\n' +
            '\r\n' +
            'Peletakan batu pertama untuk investor tahap ketujuh di IKN diikuti oleh empat investor swasta dalam negeri, yaitu BCA, Swiss-Belhotel, Royal Golden Eagle, dan Intiland.\r\n' +
            '\r\n' +
            'Basuki Hadimuljono minta kepada DPR tambahan anggaran sebesar Rp26 triliun pada 2025 untuk pemeliharaan gedung dan sejumlah sarana dan prasarana yang telah dibangun di IKN, Penajam Paser Utara, Kalimantan Timur.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724358387/di-desa/berita/wYzUspDU.jpg',
        publikasi: true,
        prioritas: true
    },
    {
        beritaId: 38,
        judul: 'Pejabat The Fed Sepakat Mau Pangkas Suku Bunga Bulan September',
        subjudul: 'Para pejabat Bank Sentral AS Federal Reserve (The Fed) secara kompak mengatakan mereka ingin menurunkan suku bunga pada pertemuan berikutnya di bulan September, bahkan beberapa di antaranya menyarankan penurunan dilakukan jauh lebih awal.',
        tanggal: '2024-08-22T20:28:53.310Z',
        isi: 'Risalah rapat yang dirilis pada hari Rabu menunjukkan bahwa "beberapa" dari 19 pejabat Fed melihat "kasus yang masuk akal" untuk menurunkan suku bunga sebesar 0,25 poin persentase pada pertemuan 30-31 Juli atau mengindikasikan "bahwa mereka mendukung keputusan tersebut." Posisi mereka didasarkan pada penurunan inflasi dan kenaikan tingkat pengangguran yang sudah terlihat dalam data ekonomi.\r\n' +
            '\r\n' +
            '"Sebagian besar" pejabat setuju bahwa "mungkin akan tepat untuk melonggarkan kebijakan pada pertemuan berikutnya," pada bulan September, jika data inflasi turun terus sesuai dengan perkiraan.\r\n' +
            '\r\n' +
            'Sejak pertemuan bulan Juli tersebut, inflasi tur tajam dan angka pengangguran di AS meningkat atau melemahnya pasar tenaga kerja.\r\n' +
            '\r\n' +
            'Suku bunga acuan AS atau federal fund rate (FFR) saat ini ditetapkan pada kisaran antara 5,25% dan 5,5% menyusul serangkaian kenaikan agresif yang dilakukan oleh The Fed dalam beberapa tahun terakhir. Hal ini diyakini secara luas akan menghambat pertumbuhan ekonomi, namun hal ini dianggap perlu oleh para pengambil kebijakan untuk menurunkan inflasi dari level tertinggi dalam 40 tahun terakhir pada tahun 2022.\r\n' +
            '\r\n' +
            'Ketua The Fed Jerome Powell mengakui dalam konferensi pers setelah pertemuan bulan Juli bahwa beberapa rekannya mengkaji kasus penurunan suku bunga pada hari itu. Namun dia mengatakan mereka "sangat" memilih menunggu hingga September.\r\n' +
            '\r\n' +
            'Menurut risalah rapat yang dirilis pada hari Rabu, "hampir semua peserta menyatakan bahwa meskipun data yang masuk mengenai inflasi cukup menggembirakan, informasi tambahan diperlukan...sebelum keputusan" untuk menurunkan suku bunga diambil.\r\n' +
            '\r\n' +
            'Pertemuan The Fed berikutnya dijadwalkan pada 17-18 September. Mengingat angka lapangan kerja dan inflasi pada bulan Juli, para pejabat lebih cenderung memperdebatkan besarnya penurunan suku bunga dibandingkan apakah akan menurunkan suku bunga. Pelaku pasar melihat 67% peluang penurunan sebesar 0,25 poin dan 33% peluang penurunan sebesar 0,5 poin, menurut CME FedWatch.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724358532/di-desa/berita/W98cewxu.jpg',
        publikasi: true,
        prioritas: false
    },
    {
        beritaId: 36,
        judul: 'Jurnalis Tempo Dipukul dan Ditendang oleh Diduga Aparat saat Liput Demo Kawal Putusan MK di DPR',
        subjudul: 'Personel TNI dan Polri diduga memukul jurnalis Tempo yang meliput demonstrasi Kawal Putusan MK di Kompleks Parlemen DPR RI pada Kamis, 22 Agustus 2024. Demonstrasi berakhir ricuh setelah massa aksi berhasil menjebol pagar sisi kanan dan kiri gerbang utama DPR.',
        tanggal: '2024-08-22T20:22:16.912Z',
        isi: 'Saat itu H berada di dekat pagar sisi kanan gerbang utama Gedung DPR RI yang dijebol massa sekitar pukul 17.00 WIB. Lokasi pagar jebol ini berada di dekat jembatan penyeberangan orang Jalan Gatot Subroto. “Saya merekam pendemo yang sudah lemas terbaring tetapi terus dipukuli oleh tentara dan polisi,” kata H kepada Tempo. \r\n' +
            '\r\n' +
            'Tiba-tiba, tiga orang diduga aparat memegang H di kanan, kiri, dan depan. Polisi yang memegangnya menanyakan asal H. H menjawab dia jurnalis Tempo dan menunjukkan surat tugas peliputan. Namun, polisi tersebut justru memaksa H menghapus video yang dia rekam. H menolak. “Kamera, kamera, lu dari mana?“ tanya polisi tersebut. \r\n' +
            '\r\n' +
            'Ia juga mendengar seseorang diduga aparat yang berada di belakangnya sempat melontarkan kalimat "matiin aja" terhadap pendemo yang terkulai itu.\r\n' +
            '\r\n' +
            'Salah seorang aparat menonjok pipi kanan H. Bagian kepala H juga dipukul. Tak sampai di situ. Seorang tentara juga menendang bagian belakang H saat akan digiring ke pos keamanan. “Sewaktu digiring ke pos ada yang menendang bagian belakang saya,” ujar H.\r\n' +
            '\r\n' +
            'Setibanya di pos, seorang polisi dari biro Provos menginterogasi H. Provos tersebut menanyakan asal H. H kembali menegaskan bahwa dia seorang jurnalis Tempo. Provos tersebut kemudian meminta H menghapus rekaman penganiayaan sebelum melepaskannya.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724358136/di-desa/berita/qoqvV5b6.jpg',
        publikasi: true,
        prioritas: true
    },
    {
        beritaId: 39,
        judul: 'Sikat Penipuan, OJK Bikin Anti Scam Center',
        subjudul: 'Otoritas Jasa Keuangan (OJK) akan segera meluncurkan Anti Scam Center (ASC) sebagai platform integrasi dalam penanganan kasus penipuan keuangan. Sistemnya akan dinamakan PUSAKA alias Pusat Penanganan Penipuan Transaksi Keuangan.',
        tanggal: '2024-08-22T20:35:52.287Z',
        isi: 'Ketua Dewan Komisioner OJK Mahendra Siregar mengatakan, pihaknya sudah mendapat dukungan penuh dari seluruh stakeholders untuk membangun ASC tersebut, termasuk Kementerian dan lembaga yang masuk dalam Satgas PASTI.\r\n' +
            '\r\n' +
            'Sebagaimana diketahui, Satgas PASTI beranggotakan 16 Kementerian/Lembaga, yaitu Otoritas Jasa Keuangan, Bank Indonesia, Kementerian Komunikasi dan Informatika Republik Indonesia, Kejaksaan Agung Republik Indonesia, hingga Kepolisian.\r\n' +
            '\r\n' +
            '"Proses implementasinya kami akan lakukan bertahap. Dan diharapkan dalam waktu dekat kita sudah bisa semacam soft launching," jelas Mahendra usai acara Gerakan Nasional Cerdas Keuangan atau GENCARKAN, di Jakarta, Kamis, (22/8/2024).\r\n' +
            '\r\n' +
            'Lebih jauh, Kepala Eksekutif Pengawas Perilaku Pelaku Usaha Jasa Keuangan Edukasi dan Perlindungan Konsumen Friderica Widyasari Dewi mengatakan, saat ini sudah 15 bank, 3 sistem pembayaran, 3 marketplace yang akan ikut dalam peluncuran ini.\r\n' +
            '\r\n' +
            '"Jadi kan uang kadang- kadang gak cuma di sistem perbankan. Tapi bisa keluar ke marketplace dan lain-lain gitu," jelas Friderica yang kerap disapa Kiki tersebut.\r\n' +
            '\r\n' +
            'Ke depan, korban kasus penipuan keuangan bisa langsung melapor ke PUSAKA tanpa harus melapor ke Kepolisian, karena penindak lanjutan laporan tersebut nantinya langsung ditangani Satgas PASTI yang terdiri dari beberapa Kementerian dan Lembaga.\r\n' +
            '\r\n' +
            '"Jadi ebih cepat ya kalau kalian misalnya uangnya di-scam itu cepat ya, Moga-moga uang itu bisa terkejar. Tapi beda kan, kadang- kadang kita kena scam gak sadar ya. Baru seminggu kemudian sadar, ya bablas," tuturnya.\r\n' +
            '\r\n' +
            'Sebagai informasi, Satgas PASTI berhasil mengidentifikasi 850 entitas pinjaman online ilegal dan sejumlah aktivitas keuangan ilegal lainnya yang berpotensi merugikan masyarakat dan melanggar ketentuan penyebaran data pribadi selama periode Juni hingga Juli 2024.\r\n' +
            '\r\n' +
            'Tidak hanya itu, Satgas PASTI juga memblokir 65 tawaran investasi ilegal yang terindikasi sebagai penipuan dengan modus peniruan atau duplikasi nama produk, situs, maupun media sosial milik entitas resmi. Modus ini sering digunakan oleh pelaku untuk menipu masyarakat.\r\n' +
            '\r\n' +
            'Selain kasus pinjaman online ilegal, Satgas PASTI juga menemukan 27 entitas yang terlibat dalam kegiatan keuangan ilegal lainnya. Termasuk, 11 entitas menawarkan pekerjaan paruh waktu palsu dan 59 konten penawaran pinjaman pribadi (pinpri).\r\n' +
            '\r\n' +
            'Terungkap pula sebanyak 7 entitas menawarkan investasi tanpa izin. Mereka adalah Ibermart, TRA, Robot Super, Gblobe Finance, Bitapp8.com, Edukasi Bitcoin Holder dan Gold and Silver Brokers Australia (GSB)\r\n' +
            '\r\n' +
            'Satgas PASTI juga menemukan satu entitas melakukan perdagangan aset kripto tanpa izin. Adapun situsnya diketahui bernama imitra.id. Terakhir, ada 8 entitas menjalankan usaha perbankan tanpa izin.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724358951/di-desa/berita/74G8XCdA.jpg',
        publikasi: true,
        prioritas: false
    },
    {
        beritaId: 41,
        judul: 'Masih Jadi Perdebatan, Ini Pro dan Kontra Investasi Kripto',
        subjudul: 'Berinvestasi merupakan keputusan yang baik untuk menjaga keuangan. Instrumen investasi sangat beragam mulai dari aset yang memiliki risiko rendah hingga tinggi.',
        tanggal: '2024-08-22T20:39:37.448Z',
        isi: 'Akan tetapi perlu diingat bahwa dalam rumus investasi, semakin besar risiko maka semakin besar potensi keuntungan. Satu instrumen yang saat ini tergolong risiko tinggi dan berpotensi memberikan keuntungan besar adalah kripto.\r\n' +
            '\r\n' +
            'Kripto merupakan sebuah mata uang digital yang nilainya tidak diatur oleh pemerintahan atau bank sentral, tetapi diatur menggunakan teknologi blockchain. Pada dasarnya, mata uang fiat, seperti rupiah dan dolar, sudah tidak memiliki aset yang mendasari pada era modern ini. Sebelumnya, fiat memiliki underlying asset berupa emas, namun Amerika Serikat menghilangkannya pada 1971.\r\n' +
            '\r\n' +
            'Di sisi lain, kripto, sebagai mata uang digital, juga tidak memiliki underlying asset. Tetapi, investor pro kripto memandang bahwa underlying dari kripto adalah teknologi blockchain. Investor dapat memperoleh keuntungan berinvestasi di kripto melalui kenaikan harga. Mengutip BankRate, pergerakan harga kripto berdasarkan spekulasi dari suatu sentimen.\r\n' +
            '\r\n' +
            'Tentunya, pilihan tersebut juga akan bergantung dengan profil risiko investor. Berikut pro dan kontra berinvestasi di kripto dari berbagai sumber dan analisis tim riset CNBC Indonesia\r\n' +
            '\r\n' +
            'Keuntungan Investasi di Aset Kripto\r\n' +
            'Lindung nilai mata uang fiat merupakan kelebihan kripto sebagai mata uang yang memberontak sistem fiat, mengingat naturalnya yang tidak diatur pemerintah dan bank sentral. Biasanya, pelemahan mata uang fiat akan meningkatkan nilai kripto dan juga sebaliknya.\r\n' +
            '\r\n' +
            'Potensi keuntungan tinggi menjadi alasan berinvestasi di kripto. Sejak November 2015, Bitcoin telah memberikan imbal hasil 85 kali lipat atau 8.500%! Berinvestasi Bitcoin Rp 1 juta saat itu akan bertumbuh menjadi Rp 85 juta.\r\n' +
            '\r\n' +
            'Peningkatan jumlah mata uang kripto dan peminatnya disebabkan pandemi covid-19 membuat hampir bank sentral seluruh dunia menerapkan kebijakan peningkatan jumlah mata uang fiat. Hal tersebut membuat pelaku pasar semakin meragukan pemerintahan dan bank sentral akan potensi terjadinya inflasi dan kenaikan suku bunga di masa depan.\r\n' +
            '\r\n' +
            'Hal tersebut menjadikan pelaku pasar berinvestasi di aset lawan mata uang fiat, sehingga minat kripto meningkat dan banyak bermunculan kripto baru.\r\n' +
            '\r\n' +
            'Kontra Berinvestasi di Aset Kripto\r\n' +
            'Volatilitas tinggi kripto merupakan risiko dibalik imbal hasilnya yang tinggi. Peningkatan harga kripto yang tinggi diikuti dengan penurunan yang tinggi pula. Maka dari itu, kripto sering disebut sebagai aset dengan risiko tinggi dan imbal hasil tinggi atau "high risk, high return".\r\n' +
            '\r\n' +
            'Risiko kejahatan siber merupakan risiko mata uang digital. Peningkatan kualitas digital diikuti dengan penjahat digital pula. Kehilangan\r\n' +
            'Kripto tidak memiliki nilai intrinsik layaknya saham yang memiliki aset yang mendasari berupa perusahaan.\r\n' +
            '\r\n' +
            'Saham dapat dinilai menggunakan kinerja perusahaan, sedangkan kripto tidak memiliki aset yang dapat mewakili mata uang digital tersebut.\r\n' +
            '\r\n' +
            'Risiko peraturan menjadi persoalan investor kripto. Banyak negara melarang perdagangan kripto, karena masih belum terdapat kejelasan dari aset baru tersebut.\r\n' +
            '\r\n' +
            'Belakangan, isu peraturan menjadi persoalan dengan gugatan terhadap Binance, Coinbase, dan sebagainya.\r\n' +
            '\r\n' +
            'Kecurangan penerbit kripto banyak terjadi di tengah bertambahnya kripto yang tidak bertanggung jawab. Tindakan ini biasa disebut dengan rug pull atau uang dibawa kabur oleh developer suatu koin, seperti yang terjadi di FTX.\r\n' +
            '\r\n' +
            'Sejumlah sentimen diperkirakan akan meningkatkan valuasi koin kripto pada 2024. Bagi investor, perlu dicatat bahwa ada beberapa koin yang diprediksi mendatangkan cuan berlipat ganda.\r\n' +
            '\r\n' +
            'Melansir Nasdaq.com, tidak hanya suku bunga yang diperkirakan akan turun, tetapi ETF yang akan datang juga diperkirakan disetujui untuk beberapa mata uang kripto terkemuka.\r\n' +
            '\r\n' +
            'Ketika lanskap investasi membaik, selera risiko investor akan kembali. Ini berarti bahwa seseorang dapat meningkatkan keuntungannya secara keseluruhan (dan juga tingkat pengembalian yang disesuaikan dengan risiko) dengan berinvestasi pada aset-aset ini.\r\n' +
            '\r\n' +
            'Oleh karena itu, berikut tiga prediksi kripto untuk membantu investor memahami pasar:\r\n' +
            '\r\n' +
            'Bitcoin (BTC)\r\n' +
            '\r\n' +
            'Peristiwa halving Bitcoin (BTC-USD) yang sangat dinanti-nantikan akhir tahun ini sudah pasti terjadi. Karena tidak akan ada lagi Bitcoin, para maksimalisnya akan memberi tahu Anda bahwa tidak perlu menggunakan jaringan lain juga.\r\n' +
            '\r\n' +
            'Di antara yang paling bersemangat dan berpengetahuan, Bitcoin dianggap sebagai satu-satunya mata uang kripto sejati. Sisanya dicemooh sebagai proyek gagal atau penipuan. Perspektif ini mempunyai beberapa manfaat. Teknologi Blockchain pada dasarnya tidak mengandung manfaat desentralisasi, keamanan, atau kekekalan yang sering diiklankan.\r\n' +
            '\r\n' +
            'Seorang investor yang jeli telah melihat banyak sekali peretasan terhadap protokol yang mengaku aman, namun kemudian menyebabkan kehancuran finansial yang meluas pada basis penggunanya. Kesalahan pengguna, pintu belakang, kesalahan pengkodean, dan upaya rekayasa sosial semuanya dapat merusak keamanan jaringan lain.\r\n' +
            '\r\n' +
            'Namun tidak demikian halnya dengan Bitcoin. Ini diteliti oleh ratusan pengembang independen, pakar keamanan, dan kriptografer. Selain itu, keputusan hanya dapat diambil melalui konsensus terpadu oleh mereka yang menggerakkan jaringan.\r\n' +
            '\r\n' +
            'Intinya, Bitcoin adalah pilihan blue-chip bagi investor yang ingin memiliki mata uang kripto yang sangat stabil dan kuat. Lebih lanjut, prediksi kripto saat ini menunjukkan bahwa nilainya bisa mencapai $1 juta per koin jika bintang-bintang sejajar.\r\n' +
            '\r\n' +
            'Ethereum (ETH)\r\n' +
            '\r\n' +
            'Ethereum (ETH-USD) adalah pilihan mata uang kripto blue-chip lainnya. Prediksi analis kripto untuk ETH juga optimis, dengan beberapa orang menyarankannya bisa mencapai $5,000.\r\n' +
            '\r\n' +
            'Khususnya, investor harus mewaspadai peramal dan juga menganggap remeh prediksi kripto. Berbeda dengan pasar saham, yang sering diperdebatkan untuk bertindak rasional dan efisien, pasar kripto berperilaku jauh berbeda.\r\n' +
            '\r\n' +
            'Jauh lebih banyak asimetri informasi dengan kripto dibandingkan dengan saham. (Bitcoin tidak perlu mempublikasikan pengungkapan atau laporan keuangan). Jadi, orang lebih cenderung bertindak berdasarkan bias perilaku berupa rasa takut, FOMO, dan spekulasi dibandingkan membuat asumsi yang beralasan.\r\n' +
            '\r\n' +
            'Terlepas dari spekulasi yang melekat pada prediksi kripto dengan ETH, nilai aset tersebut dapat melonjak, mengikuti "perkembangan positif" dalam pembentukan ETF Ethereum.\r\n' +
            '\r\n' +
            'Seperti halnya ETF Bitcoin, mereka yang mengoperasikan ETF Ethereum secara tidak langsung dapat menaikkan harga aset. Hal ini mungkin terjadi karena mereka mungkin diharuskan untuk memiliki Ethereum dalam jumlah besar, atau bahkan rasio 1:1 terhadap aset yang dikelola.\r\n' +
            '\r\n' +
            'Selain itu, kita dapat melihat ETF eksotik jika ETF kripto ini dimasukkan, seperti ETF leverage, invers, atau volatilitas.\r\n' +
            '\r\n' +
            'Koin Binance (BNB)\r\n' +
            '\r\n' +
            'Terlepas dari kontroversi seputar Binance dan Binance Coin (BNB-USD), ini masih bisa menjadi altcoin yang solid untuk dipegang.\r\n' +
            '\r\n' +
            'Binance telah menunjukkan ketahanan yang mengejutkan dalam menghadapi tuntutan hukum pidana dari para pendirinya, tindakan keras terhadap kripto di Tiongkok, dan tantangan lainnya. Selain itu, ia mempertahankan posisinya sebagai bursa mata uang kripto terbesar di dunia berdasarkan volume perdagangan dengan margin yang sangat besar.\r\n' +
            '\r\n' +
            'BNB memiliki utilitas yang kuat di ekosistem Binance. Ini digunakan untuk menawarkan diskon biaya perdagangan, dan juga memungkinkan investor berpartisipasi dalam penjualan token di Binance Launchpad. Dan, perusahaan dapat dipertaruhkan atau digunakan dalam berbagai program pertanian hasil dan penambangan likuiditas dalam ekosistem Binance, sehingga pemegangnya dapat memperoleh imbalan atau bunga.\r\n' +
            '\r\n' +
            'Koin ini mungkin terus meningkat di masa depan karena dominasi Binance yang berkelanjutan. Oleh karena itu, ini mungkin merupakan penerima manfaat utama dari pasar bullish kripto tahun ini.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724359176/di-desa/berita/cjUPhIRI.jpg',
        publikasi: true,
        prioritas: false
    },
    {
        beritaId: 40,
        judul: 'Kominfo Blokir Medsos Kripto Binance-Kucoin, Bappebti Buka Suara',
        subjudul: 'Kementerian Komunikasi dan Informatika (Kominfo) memblokir akun Instagram perusahaan perdagangan mata uang kripto luar negeri di RI, antara lain, Binance dan Binance Indonesia, Bybit dan Bybit Indonesia, Bitget Indonesia, Kucoin Exchange dan Mexc.',
        tanggal: '2024-08-22T20:37:37.166Z',
        isi: 'Ketika membuka akun-akun tersebut, akan muncul tulisan "Akun tidak tersedia di Indonesia." Itu diikuti dengan "Ini karena kami (Instagram) memenuhi permintaan hukum dari Kominfo untuk membatasi konten ini."\r\n' +
            '\r\n' +
            'Plt. Kepala Badan Pengawas Perdagangan Berjangka Komoditi (Bappebti) Kasan mengatakan bahwa pemblokiran ini merupakan langkah preventif terhadap kemungkinan kerugian, karena para pedagang kripto tersebut belum memiliki izin usaha di Indonesia.\r\n' +
            '\r\n' +
            '"Kami Bappebti yang saat ini selaku otoritas pengawas perdagangan kripto di dalam negeri sangat mendukung langkah yang dilakukan oleh Kemenkominfo, di mana entitas yg diblokir adalah perusahaan-perusahaan yang memang tidak berizin usaha di dalam negeri sehingga dianggap melanggar. Tujuan pemblokiran ini juga agar kondusivitas industri kripto di dalam negeri oleh entitas yang berizin resmi terjaga daya saingnya," ujar Kasan saat dihubungi CNBC Indonesia, Rabu (17/7/2024).\r\n' +
            '\r\n' +
            'Ia mengatakan hal itu diatur Pasal 5 Peraturan Bappebti Nomor 8 Tahun 2021 tentang tentang Pedoman Penyelenggaraan Perdagangan Pasar Fisik Aset Kripto (Crypto Asset) di Bursa Berjangka sebagaimana telah diubah dengan Peraturan Bappebti Nomor 13 Tahun 2022, bahwa Perdagangan Pasar Fisik Aset Kripto di Indonesia hanya dapat diselenggarakan oleh calon Pedagang Fisik Aset Kripto atau Pedagang Fisik Aset Kripto yang telah memperoleh tanda daftar atau persetujuan dari Kepala Bappebti.\r\n' +
            '\r\n' +
            '"Oleh karena itu sebagai bentuk perlindungan kepada masyarakat dan sebagai langkah pencegahan (preventif) adanya perlindungan hukum dan kemungkinan kerugian atas kegiatan tanpa perizinan di Indonesia, Bappebti melakukan koordinasi dengan Kementerian Komunikasi dan Informatika untuk melakukan pemblokiran domain situs web entitas atau media sosial lainnya atas entitas yang belum memperoleh persetujuan dari Bappebti untuk dapat menyelenggarakan perdagangan pasar fisik aset Kripto di Indonesia," terang Kasan.\r\n' +
            '\r\n' +
            'Ia menambahkan, transaksi di platform yang tidak berizin resmi tak menjamin risiko kerugian investor bila entitas tersebut kemudian pailit dan sebagainya.\r\n' +
            '\r\n' +
            'Sementara itu, dua akun Instagram platform perdagangan kripto terbesar asal RI yakni Tokocrypto, yang dimiliki Binance dan Indodax masih dapat diakses.',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1724359056/di-desa/berita/sh5f2EBj.jpg',
        publikasi: true,
        prioritas: false
    },
    {
        beritaId: 44,
        judul: 'PPN Naik menjadi 12%',
        subjudul: 'Bukan hanya naik 1% loh, ternyata naik 9%',
        tanggal: '2024-12-20T21:05:37.691Z',
        isi: 'Baru baru ini dikabarkan bahwa PPN naik menjadi 12%.\r\n' +
            '\r\n' +
            'Atas hasil dari rapat kemarin, diputuskan bahwa pada tanggal 1 Januari 2025 bertepatan dengan tahun baru, PPN menjadi 12%',
        gambar: 'https://res.cloudinary.com/dga0wmldp/image/upload/v1734728737/di-desa/berita/4sM6Huwj.jpg',
        publikasi: false,
        prioritas: false
    },
]

async function createBerita() {
    for (const berita of dataBerita) {
        const checkJudul = await prisma.berita.findFirst({
            where: {
                judul: berita.judul
            },
            select: {
                judul: true
            }
        })
        if (!checkJudul) {
            await prisma.berita.create({
                data: berita
            })
            console.log(`Berita ${berita.judul} berhasil dibuat`)
        } else {
            console.log(`Berita ${berita.judul} sudah ada`)
        }
    }
}


async function main() {
    const berita = await createBerita()
    console.log(berita)
}

main()