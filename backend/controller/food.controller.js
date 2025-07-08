const { default: mongoose } = require('mongoose');
const Food = require('../models/Food');
const FoodCategory = require('../models/FoodCategory');

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
    const { name, description, price, imageUrl, categoryId, ingredients, discount, rating  } = req.body; 
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
            foodCategoryId: new mongoose.Types.ObjectId(categoryId),
            ingredients: ingredients || [],
            discount: discount || 0,
            rating: rating || 0 
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
    const { name, description, price, imageUrl, categoryId, ingredients } = req.body;
    if (!name || !description || !price || !imageUrl || !categoryId ) {
        return res.status(400).json({ message: "All fields are required" });
    }

    const updatedFields = {
        foodName: name,
        foodDescription: description,
        foodPrice: price,
        foodImage: imageUrl,
        foodCategoryId: categoryId
    };

    if (ingredients !== undefined) {
        updatedFields.ingredients = ingredients;
    }
    try {
        const updatedFood = await Food.findByIdAndUpdate(foodId, updatedFields, { new: true });  // Trả về document sau khi cập nhật 
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

// GET /api/food/getFoodByCategory/:categoryId
exports.getFoodsByCategory = async (req, res) => {
    const categoryId = req.params.categoryId;
    try {
        const category = await FoodCategory.findById(categoryId);
        if(!category){
            return res.status(404).json({message: "Không tồn tại danh mục"});
        }

        const foods = await Food.find({foodCategoryId: categoryId});
        res.status(200).json({
            message: 'Danh mục ' + category.categoryName,
            foods
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// GET /api/food/search?name=banh
exports.searchFoodsByName = async (req, res) => {
    const searchQuery = req.query.name;
  
    if (!searchQuery) {
      return res.status(400).json({ message: "Search query is required" });
    }
    
    function escapeRegex(text) {
        return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
    const safeSearch = escapeRegex(searchQuery);

    try {
      const foods = await Food.find({
        foodName: { $regex: safeSearch, $options: 'i' } // i = ignoreCase -> ko phân biệt hoa thường
      });
  
      if (foods.length === 0) {
        return res.status(404).json({ message: "No foods found" });
      }
  
      res.status(200).json({
        message: `Found ${foods.length} food(s) matching "${searchQuery}"`,
        foods
      });
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
};
  