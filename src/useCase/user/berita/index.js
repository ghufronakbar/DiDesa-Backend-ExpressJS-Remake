const express = require('express');
const router = express.Router();
const { getDetailBeritaController, getBeritaController } = require('./berita.controller')
const { userCheck } = require('../../../middleware/userCheck')
const setCache = require('../../../utils/cache/setCache');

router.get('/', userCheck, setCache(43200), getBeritaController)
router.get('/:id', userCheck, setCache(43200, true), getDetailBeritaController)

module.exports = router