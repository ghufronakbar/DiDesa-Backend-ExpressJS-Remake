const express = require('express');
const router = express.Router();
const { loginController, profileController, updatePictureController, deletePictureController, forgotPasswordController, confirmForgotPasswordController, resetPasswordController } = require('./account.controller');
const { userCheck } = require('../../../middleware/userCheck');
const uploadCloudinary = require('../../../utils/uploadCloudinary');
const setCache = require('../../../utils/cache/setCache');
const clearCache = require('../../../utils/cache/clearCache');

router.post('/login', loginController)
router.get('/profile', userCheck, setCache(86400, true), profileController)
router.put('/profile', userCheck, clearCache('account', true), clearCache('warga'), uploadCloudinary('profile').single('foto'), updatePictureController)
router.delete('/profile', userCheck, clearCache('account', true), clearCache('warga'), deletePictureController)
router.post('/forgot-password', forgotPasswordController)
router.get('/forgot-password/:token', confirmForgotPasswordController)
router.put('/reset-password', userCheck, clearCache('account', true), clearCache('warga'), resetPasswordController)

module.exports = router