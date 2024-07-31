const express = require('express');
const router = express.Router();
const { getUmkmLimitController, getJenisUmkmController } = require('./umkm.controller');
const { userCheck } = require('../../../middleware/userCheck');

router.get('/', userCheck, getUmkmLimitController)
router.get('/jenis', userCheck, getJenisUmkmController)

module.exports = router