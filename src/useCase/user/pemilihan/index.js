const express = require('express');
const router = express.Router();
const { getAllPemilihanController, getPemilihanByIdController, doVoteController, getLatestPemilihanController } = require('./pemilihan.controller');
const { userCheck } = require('../../../middleware/userCheck');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', userCheck, setCache(43200), getAllPemilihanController)
router.get('/latest', userCheck, setCache(43200), getLatestPemilihanController)
router.get('/:id', userCheck, setCache(43200, true), getPemilihanByIdController)
router.post('/', userCheck, clearCache('pemilihan'), clearCache('calon'), doVoteController)

module.exports = router