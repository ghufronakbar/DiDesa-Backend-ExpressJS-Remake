const express = require('express');
const router = express.Router();
const { getAllPengurusController, getPengurusByIdController, setAdminAccessPengurusController, setJabatanPengurusController, deletePengurusController, createPengurusController } = require('./pengurusDesa.controller')
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200, true), getAllPengurusController)
router.get('/:id', setCache(43200, true), getPengurusByIdController)
router.put('/akses-admin/:id', clearCache('pengurus'), clearCache('warga'), clearCache('informasi'), setAdminAccessPengurusController)
router.put('/:id', clearCache('pengurus'), clearCache('warga'), clearCache('informasi'), setJabatanPengurusController)
router.delete('/:id', clearCache('pengurus'), clearCache('warga'), clearCache('informasi'), deletePengurusController)
router.post('/', clearCache('pengurus'), clearCache('warga'), clearCache('informasi'), createPengurusController)

module.exports = router