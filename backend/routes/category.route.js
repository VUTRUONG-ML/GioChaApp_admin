const express = require('express');
const router = express.Router();
const categoryController = require('../controller/category.controller');
const { verifyToken, verifyAdmin } = require('../middlewares/auth');

// GET all categories
router.get('/', verifyToken, categoryController.getAllCategories);

// GET one category by id
router.get('/:id', verifyToken, categoryController.getCategoryById);

// POST create category
router.post('/create', verifyToken, verifyAdmin, categoryController.createCategory);

// PUT update category
router.put('/update/:id', verifyToken, verifyAdmin, categoryController.updateCategory);

// DELETE category
router.delete('/delete/:id', verifyToken, verifyAdmin, categoryController.deleteCategory);

module.exports = router;
