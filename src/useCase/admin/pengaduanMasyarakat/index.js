const express = require('express');
const router = express.Router();
const { getPengaduanController, deletePengaduanController, getPengaduanByIdController, setStatus } = require('./pengaduanMasyarakat.controller');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200), getPengaduanController)
router.get('/:id', setCache(43200), getPengaduanByIdController)
router.patch('/:id', clearCache("pengaduan"), setStatus)
router.delete('/:id', clearCache('pengaduan'), deletePengaduanController)

module.exports = router