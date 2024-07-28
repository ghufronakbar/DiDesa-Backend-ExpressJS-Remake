const messageCreate = (name, nik, password) => {
    return `Selamat, akun Anda telah berhasil diaktifkan pada aplikasi Di Desa.\n\nDetail akun Anda adalah sebagai berikut:\n\nNama: ${name}\nNIK: ${nik}\nPassword: ${password}\n\nHarap simpan informasi ini dengan aman. Terima kasih telah menggunakan aplikasi Di Desa.`;
}

module.exports = { messageCreate }