const { getAllWargaController, getWargaByIdController, createWargaController, editWargaController, deleteWargaController, getIdWargaController } = require('./warga.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllWargaController)
router.get('/all', getIdWargaController)
router.get('/:id', getWargaByIdController)
router.post('/', createWargaController)
router.put('/:id', editWargaController)
router.delete('/:id', deleteWargaController)

module.exports = router