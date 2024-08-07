const express = require('express');
const router = express.Router();
const { getInformasiController } = require('./informasiDesa.controller');
const { userCheck } = require('../../../middleware/userCheck');
const routeCache = require('../../../utils/routeCache')

router.get('/', routeCache(300), userCheck, getInformasiController)

module.exports = router