const express = require('express');
const router = express.Router();
const { getDetailBeritaController, getBeritaController } = require('./berita.controller')
const { userCheck } = require('../../../middleware/userCheck');

router.get('/', userCheck, getBeritaController)
router.get('/:id', userCheck, getDetailBeritaController)

module.exports = router