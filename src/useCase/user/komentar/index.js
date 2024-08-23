const express = require('express');
const router = express.Router();
const { createKomentarController, deleteKomentarController } = require('./komentar.controller');
const { userCheck } = require('../../../middleware/userCheck');
const clearCache = require('../../../utils/cache/clearCache');

router.post('/', userCheck, clearCache('komentar'), clearCache('berita'), createKomentarController)
router.delete('/:id', userCheck, clearCache('komentar'), clearCache('berita'), deleteKomentarController)

module.exports = router