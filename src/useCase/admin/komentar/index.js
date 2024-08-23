const express = require('express');
const router = express.Router();
const { getAllKomentarController, deleteKomentarController } = require('./komentar.controller')
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(86400), getAllKomentarController)
router.delete('/:id', clearCache('komentar'), clearCache('berita'), deleteKomentarController)

module.exports = router
