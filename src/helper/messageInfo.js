const formatDate = require('../utils/formatDate');
const formatTime = require('../utils/formatTime');

const messageApproveUmkm = (umkm, jenis, pemilik, date) => {
    return `Selamat, UMKM Anda telah berhasil disetujui untuk tampil pada aplikasi Di Desa pada: \nTanggal: ${formatDate(date)}\nPukul: ${formatTime(date)}.\n\n*Data UMKM*:\nNama: ${umkm}\nJenis: ${jenis}\nPemilik: ${pemilik}\n\nHarap simpan informasi ini dengan aman. Terima kasih telah menggunakan aplikasi Di Desa.`;
}

const messageNotApproveUmkm = (umkm, jenis, pemilik) => {
    return `Mohon maaf, UMKM Anda tidak dapat disetujui untuk tampil pada aplikasi Di Desa karena tidak sesuai dengan ketentuan yang berlaku.\n\n*Data UMKM*:\nNama: ${umkm}\nJenis: ${jenis}\nPemilik: ${pemilik}\n\nJika terdapat kesalahan atau Anda memiliki pertanyaan lebih lanjut, dapat menghubungi melalui pengaduan masyarakat. Terima kasih.`;
}

const messageDeleteUmkm = (umkm, jenis, pemilik) => {
    return `Kami menyesal untuk memberitahukan bahwa UMKM Anda telah dihapus dari aplikasi Di Desa karena melanggar ketentuan yang berlaku.\n\n*Data UMKM*:\nNama: ${umkm}\nJenis: ${jenis}\nPemilik: ${pemilik}\n\nJika Anda ingin mengetahui lebih lanjut mengenai pelanggaran ini atau memiliki pertanyaan lain, silakan hubungi kami melalui pengaduan masyarakat. Terima kasih.`;
}

module.exports = { messageApproveUmkm, messageNotApproveUmkm, messageDeleteUmkm }
