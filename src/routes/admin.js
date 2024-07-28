const express = require('express');
const { verificationAdmin } = require('../middleware/adminVerification');
const router = express.Router();

router.use('/account', require('../useCase/admin/account'));
router.use('/informasi-desa',verificationAdmin ,require('../useCase/admin/informasiDesa'));
router.use('/berita',verificationAdmin ,require('../useCase/admin/berita'));
router.use('/komentar',verificationAdmin ,require('../useCase/admin/komentar'));
router.use('/pengaduan-masyarakat',verificationAdmin ,require('../useCase/admin/pengaduanMasyarakat'));
router.use('/umkm',verificationAdmin ,require('../useCase/admin/umkm'));
router.use('/jenis-umkm',verificationAdmin ,require('../useCase/admin/jenisUmkm'));
router.use('/warga',verificationAdmin ,require('../useCase/admin/warga'));
router.use('/pemilihan',verificationAdmin ,require('../useCase/admin/pemilihan'));


module.exports = router