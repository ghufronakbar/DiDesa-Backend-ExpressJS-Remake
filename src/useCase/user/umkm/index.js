const express = require('express');
const router = express.Router();
const { getUmkmLimitController, getJenisUmkmController, createUmkmController, getUmkmByIdController, setStatusUmkmController, editUmkmController, deleteUmkmController, getUmkmSayaController } = require('./umkm.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary')
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', userCheck, setCache(43200), getUmkmLimitController)
router.get('/saya', userCheck, setCache(43200, true), getUmkmSayaController)
router.get('/jenis', userCheck, setCache(172800), getJenisUmkmController)
router.get('/:id', userCheck, setCache(43200, true), getUmkmByIdController)
router.post('/', userCheck, clearCache('umkm'), uploadCloudinary('umkm').single('gambar'), createUmkmController)
router.put('/:id', userCheck, clearCache('umkm'), uploadCloudinary('umkm').single('gambar'), editUmkmController)
router.delete('/:id', userCheck, clearCache('umkm'), deleteUmkmController)
router.put('/status/:id', userCheck, clearCache('umkm'), setStatusUmkmController)

module.exports = router