const express = require('express');
const { getAllPemilihanController, getPemilihanByIdController, doVoteController,getLatestPemilihanController } = require('./pemilihan.controller');
const { userCheck } = require('../../../middleware/userCheck');
const router = express.Router();

router.get('/', userCheck, getAllPemilihanController)
router.get('/latest', userCheck, getLatestPemilihanController)
router.get('/:id', userCheck, getPemilihanByIdController)
router.post('/', userCheck, doVoteController)

module.exports = router