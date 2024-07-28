const express = require('express');
const router = express.Router();
const { berita, beritaById, addBerita, editBeritaById, deleteBerita, editPublikasi, editPrioritas } = require('./berita.controller');
const uploadCloudinary = require('../../../utils/uploadCloudinary');

router.get('/', berita)
router.get('/:id', beritaById)
router.post('/', uploadCloudinary('berita').single('gambar'), addBerita)
router.put('/:id', uploadCloudinary('berita').single('gambar'), editBeritaById)
router.delete('/:id', deleteBerita)
router.put('/publikasi/:id', editPublikasi)
router.put('/prioritas/:id', editPrioritas)

module.exports = router