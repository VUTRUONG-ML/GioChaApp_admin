const Food = require('../models/Food');

// GET /api/foods
exports.getFoods = async (req, res) => {
    try {
        const lstFood = await Food.find();
        if (lstFood.length === 0) {
            return res.status(404).json({ message: "No food items found" });
        }
        res.status(200).json(lstFood);
    }catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/foods/:id
exports.getFoodsById = async (req, res) => {
    const foodId = req.params.id;
    try {
        const food = await Food.findById(foodId);
        if (!food) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({
            message: "Food item found",
            food
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /api/foods/create
exports.createFood = async (req, res) => {
    const { name, description, price, imageUrl, categoryId } = req.body; 
    const food = await Food.findOne({ foodName: name });
    // Kiểm tra các trường bắt buộc
    if (!name || !description || !price || !imageUrl || !categoryId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        const newFood = new Food({
            foodName: name,
            foodDescription: description,
            foodPrice: price,
            foodImage: imageUrl,
            foodCategoryId: categoryId
        });
        const saveFood = await newFood.save();
        res.status(201).json({
            message: "Food item created successfully",
            food: saveFood
        });
    } catch (error) {
        if (error.code === 11000) {
            return res.status(409).json({ message: "Tên món đã tồn tại" });
        }
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/foods/update/:id
exports.updateFood = async (req, res) => {
    const foodId = req.params.id;
    const { name, description, price, imageUrl, categoryId } = req.body;
    if (!name || !description || !price || !imageUrl || !categoryId) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const updatedFood = await Food.findByIdAndUpdate(foodId,{
            foodName: name,
            foodDescription: description,
            foodPrice: price,
            foodImage: imageUrl,
            foodCategoryId: categoryId
        }, { new: true });  // Trả về document sau khi cập nhật 
        if (!updatedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({
            message: "Food item updated successfully",
            food: updatedFood
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/foods/delete/:id
exports.deleteFood = async (req, res) => {
    const foodId = req.params.id;
    try {
        const deletedFood = await Food.findByIdAndDelete(foodId);
        if (!deletedFood) {
            return res.status(404).json({ message: "Food item not found" });
        }
        res.status(200).json({
            message: "Food item deleted successfully",
            food: deletedFood
        })
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

