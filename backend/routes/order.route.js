const express = require('express');
const router = express.Router();
const orderController = require('../controller/order.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// GET /api/orders
router.get('/', verifyToken, verifyAdmin, orderController.getOrders);

// GET /api/orders/userOrders
router.get('/userOrders', verifyToken, orderController.getUserOrders);

// GET /api/orders/:id
router.get('/:id', verifyToken, orderController.getOrderById);

// POST /api/orders/create
router.post('/create', verifyToken, orderController.createOrder);

// PUT /api/orders/userUpdate/:id
router.put('/userUpdate/:id', verifyToken, orderController.updateOrderByUser);

// PUT /api/orders/adminUpdate/:id
router.put('/adminUpdate/:id', verifyToken, verifyAdmin, orderController.updateOrderByAdmin);

// DELETE /api/orders/delete/:id
router.delete('/delete/:id', verifyToken, verifyAdmin, orderController.deleteOrder);

module.exports = router;