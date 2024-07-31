const express = require('express');
const router = express.Router();
const { getInformasiController } = require('./informasiDesa.controller');
const { userCheck } = require('../../../middleware/userCheck');

router.get('/', userCheck, getInformasiController)

module.exports = router