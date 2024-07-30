const { getAllWargaController, getWargaByIdController, createWargaController, editWargaController, deleteWargaController, getIdWargaController } = require('./warga.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllWargaController)
router.get('/:id', getWargaByIdController)
router.post('/', createWargaController)
router.put('/:id', editWargaController)
router.delete('/:id', deleteWargaController)
router.get('/all', getIdWargaController)

module.exports = router