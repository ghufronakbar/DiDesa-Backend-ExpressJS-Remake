const { getAllUmkmController, getUmkmByIdController, deleteUmkmController, approveUmkmController } = require('./umkm.controller');
const express = require('express');
const router = express.Router();

router.get('/', getAllUmkmController)
router.get('/:id', getUmkmByIdController)
router.delete('/:id', deleteUmkmController)
router.put('/approve/:id', approveUmkmController)

module.exports = router