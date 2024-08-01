const express = require('express');
const { getAllPemilihanController, getPemilihanByIdController, doVoteController } = require('./pemilihan.controller');
const { userCheck } = require('../../../middleware/userCheck');
const router = express.Router();

router.get('/', userCheck, getAllPemilihanController)
router.get('/:id', userCheck, getPemilihanByIdController)
router.post('/', userCheck, doVoteController)

module.exports = router