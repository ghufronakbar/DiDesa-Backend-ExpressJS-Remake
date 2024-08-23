const express = require('express');
const router = express.Router();
const { getAllUmkmController, getUmkmByIdController, deleteUmkmController, approveUmkmController } = require('./umkm.controller');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200), getAllUmkmController)
router.get('/:id', setCache(43200), getUmkmByIdController)
router.delete('/:id', clearCache('umkm'), deleteUmkmController)
router.put('/approve/:id', clearCache('umkm'), approveUmkmController)

module.exports = router