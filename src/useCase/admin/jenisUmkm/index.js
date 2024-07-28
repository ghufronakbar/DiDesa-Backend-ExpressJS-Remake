const { getAllJenisUmkmController, getJenisUmkmByIdController, createJenisUmkmController, editJenisUmkmController, deleteJenisUmkmController } = require('./jenisUmkm.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllJenisUmkmController)
router.get('/:id', getJenisUmkmByIdController)
router.post('/', createJenisUmkmController)
router.put('/:id', editJenisUmkmController)
router.delete('/:id', deleteJenisUmkmController)

module.exports = router