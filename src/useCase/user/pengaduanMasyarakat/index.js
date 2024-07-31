const express = require('express');
const router = express.Router();
const { createPengaduanController, getAllPengaduanController, getPengaduanByIdController, deletePengaduanController } = require('./pengaduanMasyarakat.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary')

router.get('/', userCheck, getAllPengaduanController)
router.get('/:id', userCheck, getPengaduanByIdController)
router.post('/', userCheck, uploadCloudinary('pengaduan').single('foto'), createPengaduanController)
router.delete('/:id', userCheck, deletePengaduanController)

module.exports = router