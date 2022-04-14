const router = require('express').Router();

const AuthController = require('../../controllers/auth.controller');
const {
  authenticateUser,
} = require('../../middleware/authentication.middleware');

const multerUpload = require('../../middleware/multer.middleware')

router.get('/logout', authenticateUser, AuthController.logout);

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/verify-email', AuthController.verifyEmail);
router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);
router.post('/change-password', AuthController.changePassword);
router.post('/uploadPhoto', authenticateUser, multerUpload, AuthController.uploadFile);


module.exports = router;
     