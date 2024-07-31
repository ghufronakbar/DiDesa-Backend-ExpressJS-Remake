const express = require('express');
const router = express.Router();

router.use('/account', require('../useCase/user/account'));
router.use('/berita', require('../useCase/user/berita'));
router.use('/komentar', require('../useCase/user/komentar'));
router.use('/umkm', require('../useCase/user/umkm'));
router.use('/pengaduan-masyarakat', require('../useCase/user/pengaduanMasyarakat'));

module.exports = router