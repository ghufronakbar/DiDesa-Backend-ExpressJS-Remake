const express = require('express');
const router = express.Router();
const { getAllJenisUmkmController, getJenisUmkmByIdController, createJenisUmkmController, editJenisUmkmController, deleteJenisUmkmController } = require('./jenisUmkm.controller');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(172800), getAllJenisUmkmController)
router.get('/:id', setCache(172800), getJenisUmkmByIdController)
router.post('/', clearCache('umkm'), createJenisUmkmController)
router.put('/:id', clearCache('umkm'), editJenisUmkmController)
router.delete('/:id', clearCache('umkm'), deleteJenisUmkmController)

module.exports = router