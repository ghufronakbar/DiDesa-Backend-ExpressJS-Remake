const express = require('express');
const router = express.Router();
const { createKomentarController, deleteKomentarController } = require('./komentar.controller');
const { userCheck } = require('../../../middleware/userCheck')

router.post('/', userCheck, createKomentarController)
router.delete('/:id', userCheck, deleteKomentarController)

module.exports = router