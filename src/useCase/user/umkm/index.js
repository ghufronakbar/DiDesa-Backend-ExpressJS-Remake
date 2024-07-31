const express = require('express');
const router = express.Router();
const { getUmkmLimitController, getJenisUmkmController, createUmkmController, getUmkmByIdController, setStatusUmkmController, editUmkmController } = require('./umkm.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary')

router.get('/', userCheck, getUmkmLimitController)
router.get('/jenis', userCheck, getJenisUmkmController)
router.get('/:id', userCheck, getUmkmByIdController)
router.put('/:id', userCheck, uploadCloudinary('umkm').single('gambar'), editUmkmController)
router.post('/', userCheck, uploadCloudinary('umkm').single('gambar'), createUmkmController)
router.put('/status/:id', userCheck, setStatusUmkmController)

module.exports = router