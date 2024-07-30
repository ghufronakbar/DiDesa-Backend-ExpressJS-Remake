const { getAllPemilihanController, getPemilihanByIdController, createPemilihanController, editPemilihanController, deletePemilihanController, createCalonController, editCalonController, deleteCalonController, getPemilihanByCalonIdController } = require('./pemilihan.controller')
const express = require('express');
const router = express.Router();

router.get('/', getAllPemilihanController)
router.get('/:id', getPemilihanByIdController)
router.post('/', createPemilihanController)
router.put('/:id', editPemilihanController)
router.delete('/:id', deletePemilihanController)

router.get('/calon', getPemilihanByCalonIdController)
router.post('/calon', createCalonController)
router.put('/calon/:id', editCalonController)
router.delete('/calon/:id', deleteCalonController)

module.exports = router