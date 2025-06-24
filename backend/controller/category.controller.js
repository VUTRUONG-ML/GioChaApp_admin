const FoodCategory = require('../models/FoodCategory');

// GET /api/categories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await FoodCategory.find();
        if (categories.length === 0) {
            return res.status(404).json({ message: "No categories found" });
        }
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/categories/:id
exports.getCategoryById = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const category = await FoodCategory.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /api/categories/create
exports.createCategory = async (req, res) => {
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName || !categoryDescription) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const newCategory = new FoodCategory({
            categoryName,
            categoryDescription
        });
        const savedCategory = await newCategory.save();
        res.status(201).json({
            message: "Category created successfully",
            category: savedCategory
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/categories/update/:id
exports.updateCategory = async (req, res) => {
    const categoryId = req.params.id;
    const { categoryName, categoryDescription } = req.body;
    if (!categoryName || !categoryDescription) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const updatedCategory = await FoodCategory.findByIdAndUpdate(categoryId, {
            categoryName,
            categoryDescription
        }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category updated successfully",
            category: updatedCategory
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/categories/delete/:id
exports.deleteCategory = async (req, res) => {
    const categoryId = req.params.id;
    try {
        const deletedCategory = await FoodCategory.findByIdAndDelete(categoryId);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }
        res.status(200).json({
            message: "Category deleted successfully",
            category: deletedCategory
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
