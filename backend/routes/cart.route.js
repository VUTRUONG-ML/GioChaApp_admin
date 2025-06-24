const express = require('express');
const router = express.Router();
const CartController = require('../controller/cart.controller');
const { verifyToken } = require('../middlewares/auth');


// GET /api/cart/
router.get('/', verifyToken, CartController.getCart);

// POST /api/cart/addToCart/
router.post('/addToCart', verifyToken, CartController.addToCart);

// PUT /api/cart/updateCart
router.put('/updateCart', verifyToken, CartController.updateCart);

// DELETE /api/cart/removeFromCart/:foodId
router.delete('/removeFromCart/:foodId', verifyToken, CartController.removeFromCart);

// DELETE /api/cart/clearCart
router.delete('/clearCart', verifyToken, CartController.clearCart);

module.exports = router;
