const express = require('express');
const router = express.Router();
const { getAllPemilihanController, getPemilihanByIdController, createPemilihanController, editPemilihanController, deletePemilihanController, createCalonController, editCalonController, deleteCalonController, getPemilihanByCalonIdController } = require('./pemilihan.controller')
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200), getAllPemilihanController)
router.get('/:id', setCache(43200), getPemilihanByIdController)
router.post('/', clearCache('pemilihan'), createPemilihanController)
router.put('/:id', clearCache('pemilihan'), editPemilihanController)
router.delete('/:id', clearCache('pemilihan'), deletePemilihanController)

router.get('/calon', setCache(43200), getPemilihanByCalonIdController)
router.post('/calon', clearCache('pemilihan'), createCalonController)
router.put('/calon/:id', clearCache('pemilihan'), editCalonController)
router.delete('/calon/:id', clearCache('pemilihan'), deleteCalonController)

module.exports = router