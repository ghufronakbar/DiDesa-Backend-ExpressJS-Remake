const express = require('express');
const { informasiDesa, editInformasi } = require('./informasiDesa.controller');
const router = express.Router();

router.get('/',informasiDesa)
router.put('/', editInformasi)

module.exports = router