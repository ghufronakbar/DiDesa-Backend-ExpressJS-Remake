const express = require('express');
const router = express.Router();
const { createPengaduanController, getAllPengaduanController, getPengaduanByIdController, deletePengaduanController } = require('./pengaduanMasyarakat.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary')
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', userCheck, setCache(86400, true), getAllPengaduanController)
router.get('/:id', userCheck, setCache(86400, true), getPengaduanByIdController)
router.post('/', userCheck, clearCache('pengaduan'), uploadCloudinary('pengaduan').single('foto'), createPengaduanController)
router.delete('/:id', userCheck, clearCache('pengaduan'), deletePengaduanController)

module.exports = router