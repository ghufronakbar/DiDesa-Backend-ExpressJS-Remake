const {
    getAllPengurusController,
    getPengurusByIdController,
    setAdminAccessPengurusController,
    setJabatanPengurusController,
    deletePengurusController,
    createPengurusController
} = require('./pengurusDesa.controller')

const express = require('express');
const router = express.Router();

router.get('/', getAllPengurusController)
router.get('/:id', getPengurusByIdController)
router.put('/akses-admin/:id', setAdminAccessPengurusController)
router.put('/:id', setJabatanPengurusController)
router.delete('/:id', deletePengurusController)
router.post('/', createPengurusController)

module.exports = router