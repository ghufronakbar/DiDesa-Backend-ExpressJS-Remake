const express = require('express');
const router = express.Router();

router.use('/account', require('../useCase/user/account'));
router.use('/berita', require('../useCase/user/berita'));
router.use('/komentar', require('../useCase/user/komentar'));

module.exports = router