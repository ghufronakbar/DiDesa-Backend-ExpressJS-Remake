const express = require('express');
const { login } = require('./account.controller');
const router = express.Router();

router.post('/login', login)

module.exports = router