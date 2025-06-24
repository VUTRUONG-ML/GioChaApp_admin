const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getUser);

module.exports = router;