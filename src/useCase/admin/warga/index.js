const { getAllWargaController, getWargaByIdController, createWargaController, editWargaController, deleteWargaController, getIdWargaController } = require('./warga.controller');
const express = require('express');
const router = express.Router();
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200), getAllWargaController)
router.get('/all', setCache(43200), getIdWargaController)
router.get('/:id', setCache(43200), getWargaByIdController)
router.post('/', clearCache('warga'), createWargaController)
router.put('/:id', clearCache('warga'), editWargaController)
router.delete('/:id', clearCache('warga'), deleteWargaController)

module.exports = router