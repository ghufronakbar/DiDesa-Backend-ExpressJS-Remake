const { getAllWargaController, getWargaByIdController, createWargaController, editWargaController, deleteWargaController } = require('./warga.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllWargaController)
router.get('/:id', getWargaByIdController)
router.post('/', createWargaController)
router.put('/:id', editWargaController)
router.delete('/:id', deleteWargaController)

module.exports = router