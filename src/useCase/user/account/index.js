const express = require('express');
const router = express.Router();
const { loginController, profileController, updatePictureController, deletePictureController, forgotPasswordController, confirmForgotPasswordController } = require('./account.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary');

router.post('/login', loginController)
router.get('/profile', userCheck, profileController)
router.put('/profile', userCheck, uploadCloudinary('profile').single('foto'), updatePictureController)
router.delete('/profile', userCheck, deletePictureController)
router.post('/forgot-password', forgotPasswordController)
router.get('/forgot-password/:token', confirmForgotPasswordController)

module.exports = router