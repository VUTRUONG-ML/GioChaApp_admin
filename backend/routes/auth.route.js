const express = require('express');
const router = express.Router();
const authController = require('../controller/auth.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/', verifyToken, verifyAdmin, authController.getUsers);
router.get('/me', verifyToken, authController.getMe);
router.get('/:id', verifyToken, verifyAdmin, authController.getUserById);
router.put('/update/:id', verifyToken, verifyAdmin, authController.updateUser);
router.delete('/delete/:id', verifyToken, verifyAdmin, authController.deleteUser);

module.exports = router;