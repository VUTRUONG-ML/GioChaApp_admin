const { default: mongoose } = require('mongoose');
const Cart = require('../models/Cart');
const Food = require('../models/Food');
const User = require('../models/User');

// GET /api/cart/getCart/
exports.getCart = async (req, res) => {
    try{
        const userId = req.user.id; // Lấy ID người dùng từ token
        const cart = await Cart.findOne({ userId}).populate('items.food');
        if(!cart) return res.status(404).json({ message: "Cart not found" });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /api/cart/addToCart/
exports.addToCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    if (!foodId || !quantity) {
        return res.status(400).json({ message: "Food ID and quantity are required" });
    }   
    if (!mongoose.isValidObjectId(foodId)) {
        return res.status(400).json({ message: "Invalid food ID" });
    }
      
    try{
        const userId = req.user.id;
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId: userId, items: [{ food: foodId, quantity }] });
        }
        else {  
            const itemIndex = cart.items.findIndex(item => item.food.equals(foodId));
            if (itemIndex > -1){
                // Nếu món ăn đã có trong giỏ hàng, cập nhật số lượng
                cart.items[itemIndex].quantity += quantity;
            }
            else {
                // Nếu món ăn chưa có trong giỏ hàng, thêm mới
                cart.items.push({ food: foodId, quantity });
            }
        }
        await cart.save();
        res.status(200).json({ message: "Item added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/cart/updateCart
exports.updateCart = async (req, res) => {
    const { foodId, quantity } = req.body;
    if (!foodId || !quantity) {
        return res.status(400).json({ message: "Food ID and quantity are required" });
    }
    try{
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        const item = cart.items.find(item => item.food.equals(foodId));
        if (!item) {
            return res.status(404).json({ message: "Item not found in cart" });
        }
        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: "Cart updated successfully", cart });
    } catch (error) {   
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/cart/removeFromCart/:foodId
exports.removeFromCart = async (req, res) => {
    const foodId = req.params.foodId;
    if (!foodId) {
        return res.status(400).json({ message: "Food ID is required" });
    }
    try{
        const userId = req.user.id;
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        cart.items = cart.items.filter(item => !item.food.equals(foodId));
        await cart.save();
        res.status(200).json({ message: "Item removed from cart successfully", cart });
    } catch (error) {   
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/cart/clearCart
exports.clearCart = async (req, res) => {
    try{
        const userId = req.user.id;
        const cart = await Cart.findOneAndDelete({ userId });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};