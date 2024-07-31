const express = require('express');
const router = express.Router();
const { getUmkmLimitController, getJenisUmkmController, createUmkmController, getUmkmByIdController, setStatusUmkmController, editUmkmController, deleteUmkmController } = require('./umkm.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary')

router.get('/', userCheck, getUmkmLimitController)
router.get('/jenis', userCheck, getJenisUmkmController)
router.get('/:id', userCheck, getUmkmByIdController)
router.post('/', userCheck, uploadCloudinary('umkm').single('gambar'), createUmkmController)
router.put('/:id', userCheck, uploadCloudinary('umkm').single('gambar'), editUmkmController)
router.delete('/:id', userCheck, deleteUmkmController)
router.put('/status/:id', userCheck, setStatusUmkmController)

module.exports = router