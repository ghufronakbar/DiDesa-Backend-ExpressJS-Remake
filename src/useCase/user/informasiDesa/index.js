const express = require('express');
const router = express.Router();
const { getInformasiController } = require('./informasiDesa.controller');
const { userCheck } = require('../../../middleware/userCheck');
const setCache = require('../../../utils/cache/setCache');

router.get('/', userCheck, setCache(86400), getInformasiController)

module.exports = router