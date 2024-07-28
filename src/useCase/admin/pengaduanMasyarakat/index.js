const  { getPengaduanController, deletePengaduanController,getPengaduanByIdController } = require('./pengaduanMasyarakat.controller');
const express = require('express');
const router = express.Router();

router.get('/', getPengaduanController)
router.get('/:id', getPengaduanByIdController)
router.delete('/:id', deletePengaduanController)

module.exports = router