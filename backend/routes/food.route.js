const express = require('express');
const router = express.Router();
const foodController = require('../controller/food.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// GET /api/foods
router.get('/', verifyToken, foodController.getFoods);

// GET /api/food/search?name=banh
router.get('/search',verifyToken, foodController.searchFoodsByName);

// GET /api/food/getFoodByCategory/:categoryId
router.get('/getFoodByCategory/:categoryId', verifyToken, foodController.getFoodsByCategory);

// POST /api/foods/create
router.post('/create', verifyToken, verifyAdmin, foodController.createFood);

// PUT /api/foods/update/:id
router.put('/update/:id', verifyToken, verifyAdmin, foodController.updateFood);

// DELETE /api/foods/delete/:id
router.delete('/delete/:id', verifyToken, verifyAdmin, foodController.deleteFood);

// GET /api/foods/:id
router.get('/:id', verifyToken, foodController.getFoodsById);

module.exports = router;