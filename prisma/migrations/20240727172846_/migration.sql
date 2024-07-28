-- CreateTable
CREATE TABLE "Berita" (
    "beritaId" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "subjudul" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isi" TEXT NOT NULL,
    "gambar" VARCHAR(255) NOT NULL,
    "publikasi" BOOLEAN NOT NULL DEFAULT false,
    "prioritas" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("beritaId")
);

-- CreateTable
CREATE TABLE "CalonKetua" (
    "calonKetuaId" SERIAL NOT NULL,
    "pemilihanKetuaId" INTEGER NOT NULL,
    "wargaId" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "totalPemilih" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "CalonKetua_pkey" PRIMARY KEY ("calonKetuaId")
);

-- CreateTable
CREATE TABLE "InformasiDesa" (
    "informasiDesaId" SERIAL NOT NULL,
    "namaDesa" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "luas_lahan_pertanian" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "lahan_peternakan" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "InformasiDesa_pkey" PRIMARY KEY ("informasiDesaId")
);

-- CreateTable
CREATE TABLE "JenisUmkm" (
    "jenisUmkmId" SERIAL NOT NULL,
    "namaJenisUmkm" VARCHAR(255) NOT NULL,

    CONSTRAINT "JenisUmkm_pkey" PRIMARY KEY ("jenisUmkmId")
);

-- CreateTable
CREATE TABLE "Komentar" (
    "komentarId" SERIAL NOT NULL,
    "wargaId" INTEGER NOT NULL,
    "isi" TEXT NOT NULL,
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "beritaId" INTEGER NOT NULL,

    CONSTRAINT "Komentar_pkey" PRIMARY KEY ("komentarId")
);

-- CreateTable
CREATE TABLE "PemilihanKetua" (
    "pemilihanKetuaId" SERIAL NOT NULL,
    "tanggalMulai" TIMESTAMP(3) NOT NULL,
    "tanggalSelesai" TIMESTAMP(3) NOT NULL,
    "judul" VARCHAR(255) NOT NULL,
    "deskripsi" TEXT NOT NULL,

    CONSTRAINT "PemilihanKetua_pkey" PRIMARY KEY ("pemilihanKetuaId")
);

-- CreateTable
CREATE TABLE "PengaduanMasyarakat" (
    "pengaduanMasyarakatId" SERIAL NOT NULL,
    "wargaId" INTEGER NOT NULL,
    "subjek" VARCHAR(255) NOT NULL,
    "isi" TEXT NOT NULL,
    "foto" VARCHAR(255),
    "tanggal" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PengaduanMasyarakat_pkey" PRIMARY KEY ("pengaduanMasyarakatId")
);

-- CreateTable
CREATE TABLE "PengurusDesaAnggota" (
    "pengurusDesaAnggotaId" SERIAL NOT NULL,
    "wargaId" INTEGER NOT NULL,
    "jabatan" VARCHAR(255) NOT NULL,
    "aksesAdmin" BOOLEAN NOT NULL DEFAULT false,
    "token" TEXT,

    CONSTRAINT "PengurusDesaAnggota_pkey" PRIMARY KEY ("pengurusDesaAnggotaId")
);

-- CreateTable
CREATE TABLE "Umkm" (
    "umkmId" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "jenisUmkmId" INTEGER NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "gambar" VARCHAR(255) NOT NULL,
    "lokasi" VARCHAR(255) NOT NULL,
    "approve" BOOLEAN NOT NULL DEFAULT false,
    "status" BOOLEAN NOT NULL DEFAULT false,
    "wargaId" INTEGER NOT NULL,

    CONSTRAINT "Umkm_pkey" PRIMARY KEY ("umkmId")
);

-- CreateTable
CREATE TABLE "Warga" (
    "wargaId" SERIAL NOT NULL,
    "nik" VARCHAR(25) NOT NULL,
    "kk" VARCHAR(25) NOT NULL,
    "namaLengkap" VARCHAR(255) NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "foto" VARCHAR(255),
    "hakPilih" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "token" TEXT,

    CONSTRAINT "Warga_pkey" PRIMARY KEY ("wargaId")
);

-- AddForeignKey
ALTER TABLE "CalonKetua" ADD CONSTRAINT "CalonKetua_pemilihanKetuaId_fkey" FOREIGN KEY ("pemilihanKetuaId") REFERENCES "PemilihanKetua"("pemilihanKetuaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CalonKetua" ADD CONSTRAINT "CalonKetua_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_beritaId_fkey" FOREIGN KEY ("beritaId") REFERENCES "Berita"("beritaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Komentar" ADD CONSTRAINT "Komentar_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengaduanMasyarakat" ADD CONSTRAINT "PengaduanMasyarakat_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PengurusDesaAnggota" ADD CONSTRAINT "PengurusDesaAnggota_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Umkm" ADD CONSTRAINT "Umkm_jenisUmkmId_fkey" FOREIGN KEY ("jenisUmkmId") REFERENCES "JenisUmkm"("jenisUmkmId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Umkm" ADD CONSTRAINT "Umkm_wargaId_fkey" FOREIGN KEY ("wargaId") REFERENCES "Warga"("wargaId") ON DELETE CASCADE ON UPDATE CASCADE;
