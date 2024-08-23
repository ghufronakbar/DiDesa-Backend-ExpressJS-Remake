const express = require('express');
const router = express.Router();
const { berita, beritaById, addBerita, editBeritaById, deleteBerita, editPublikasi, editPrioritas } = require('./berita.controller');
const uploadCloudinary = require('../../../utils/uploadCloudinary');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.get('/', setCache(43200), berita)
router.get('/:id', setCache(43200), beritaById)
router.post('/', clearCache('berita'), uploadCloudinary('berita').single('gambar'), addBerita)
router.put('/:id', clearCache('berita'), uploadCloudinary('berita').single('gambar'), editBeritaById)
router.delete('/:id', clearCache('berita'), deleteBerita)
router.put('/publikasi/:id', clearCache('berita'), editPublikasi)
router.put('/prioritas/:id', clearCache('berita'), editPrioritas)

module.exports = router