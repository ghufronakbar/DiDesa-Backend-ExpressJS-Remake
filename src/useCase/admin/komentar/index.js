const express = require('express');
const router = express.Router();
const { getAllKomentarController, deleteKomentarController } = require('./komentar.controller')

router.get('/', getAllKomentarController)
router.delete('/:id', deleteKomentarController)

module.exports = router
