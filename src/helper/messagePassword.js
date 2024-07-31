const messageCreate = (name, nik, password) => {
    return `*DiDesa - Informasi Akun*\n\nSelamat, akun Anda telah berhasil diaktifkan pada aplikasi Di Desa.\n\nDetail akun Anda adalah sebagai berikut:\n\nNama: ${name}\nNIK: ${nik}\nPassword: ${password}\n\nHarap simpan informasi ini dengan aman. Terima kasih telah menggunakan aplikasi Di Desa.`;
}

const messageLinkVerify = (nama, link) => {
    const date = new Date();
    const hours = date.getHours();
    let time = "";
    if (hours < 10) {
        time = "Pagi";
    } else if (hours < 14) {
        time = "Siang";
    } else if (hours < 18) {
        time = "Sore";
    } else {
        time = "Malam";
    }
    return `*DiDesa - Link Verifikasi*\n\nSelamat ${time}, ${nama}\nBerikut adalah link verifikasi untuk melakukan atur ulang password. Harap Anda dapat menjaga kerahasiaan link ini dan tidak membagikannya kepada siapapun untuk keamanan akun Anda. Link ini akan kadaluarsa dalam 10 menit.\n\n${link}\n\nJika Anda tidak meminta pengaturan ulang password ini, segera hubungi tim DiDesa melalui email lanstheprodigy@gmail.com.\n\nTerima kasih atas perhatian dan kerjasamanya.\n\nSalam hormat,\nTim DiDesa`
}

const messagePasswordReset = (nama, password) => {
    const date = new Date();
    const hours = date.getHours();
    let time = "";
    if (hours < 10) {
        time = "Pagi";
    } else if (hours < 14) {
        time = "Siang";
    } else if (hours < 18) {
        time = "Sore";
    } else {
        time = "Malam";
    }
    return `*DiDesa - Password Reset*\n\nSelamat ${time}, ${nama}\nPassword Anda telah berhasil di-reset. Berikut adalah password baru Anda. Harap Anda dapat menjaga kerahasiaan password ini dan tidak membagikannya kepada siapapun untuk keamanan akun Anda. Segera ganti password Anda agar lebih aman.\n\nPassword baru: ${password}\n\nJika Anda tidak meminta pengaturan ulang password ini, segera hubungi tim DiDesa melalui email lanstheprodigy@gmail.com.\n\nTerima kasih atas perhatian dan kerjasamanya.\n\nSalam hormat,\nTim DiDesa`
}


module.exports = { messageCreate, messageLinkVerify, messagePasswordReset }