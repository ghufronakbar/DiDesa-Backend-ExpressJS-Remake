const express = require('express');
const router = express.Router();
const { userCheck } = require('../middleware/userCheck');

router.use('/account', require('../useCase/user/account'));

module.exports = router