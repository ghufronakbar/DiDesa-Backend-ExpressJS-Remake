const express = require('express');
const router = express.Router();
const { informasiDesa, editInformasi } = require('./informasiDesa.controller');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(172800), informasiDesa)
router.put('/', clearCache('informasi'), editInformasi)

module.exports = router