const Cart = require('../models/Cart');
const Order = require('../models/Order');

// GET /api/orders
exports.getOrders = async (req, res) => {
    try {
        const lstOrder = await Order.find()
            .populate('userId', 'userName email')
            .populate('items.food', 'foodName foodPrice foodImage');
        if (lstOrder.length === 0) {
            return res.status(404).json({ message: "No orders found" });
        }
        res.status(200).json(lstOrder);
    } catch (error) {   
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/orders/userOrders
exports.getUserOrders = async (req, res) => {
    const userId = req.user.id;
    try {
        const userOrders = await Order.find({ userId: userId })
            .populate('items.food', 'foodName foodPrice foodImage');
        if (userOrders.length === 0) {
            return res.status(404).json({ message: "No orders found for this user" });
        }
        res.status(200).json(userOrders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// GET /api/orders/:id
exports.getOrderById = async (req, res) => {
    const orderId = req.params.id;
    try {
        const order = await Order.findById(orderId).populate('items.food', 'foodName foodPrice foodImage');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order found",
            order
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// POST /api/orders/create
// Người dùng nhấn đặt hàng từ Cart chỉ truyền address và paymentMeThod, totalPrice, items thì tính từ Cart
exports.createOrder = async (req, res) => {
    const {address, paymentMethod } = req.body;
    const userId = req.user.id; // Lấy userId từ token đã xác thực
    // Kiểm tra các trường bắt buộc
    if (!address || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try{
        // Kiểm tra xem giỏ hàng có rỗng không
        const cart = await Cart.findOne({ userId: userId }).populate('items.food');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }
        // Tạo đơn hàng mới
        // Tính totalPrice 
        let totalPrice = 0;
        const orderItems = cart.items.map(item => {
            totalPrice += item.food.foodPrice * item.quantity;
            return {
                food: item.food._id,
                quantity: item.quantity
            };
        });
        

        const newOrder = new Order({
            userId: userId,
            items: orderItems,
            totalPrice: totalPrice,
            address: address,
            paymentMethod: paymentMethod
        });
        const savedOrder = await newOrder.save();
        // Xóa giỏ hàng sau khi đặt hàng thành công
        await Cart.deleteOne({ userId: userId });
        res.status(201).json({
            message: "Order created successfully",
            order: savedOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// PUT /api/orders/userUpdate/:id
exports.updateOrderByUser = async (req, res) => {
    const orderId = req.params.id;
    const {items, address, paymentMethod } = req.body;
    // Kiểm tra các trường bắt buộc
    if (!address || !paymentMethod) {
        return res.status(400).json({ message: "All fields are required" });
    }
    try {
        const order = await Order.findById(orderId).populate('items.food', 'foodName foodPrice foodImage');
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }
        if(order.userId.toString() !== req.user.id) {
            return res.status(403).json({ message: "You are not authorized to update this order" });
        }
        // Cập nhật thông tin đơn hàng
        if (items) {
            order.items = items;

            let totalPrice = 0;
            order.items.forEach(item => {
                totalPrice += item.food.foodPrice * item.quantity;
            });
            order.totalPrice = totalPrice;
        }

        if (address) {
            order.address = address;
        }
        if (paymentMethod) {
            order.paymentMethod = paymentMethod;
        }
        const updatedOrder = await order.save();
        res.status(200).json({
            message: "Order updated successfully",
            order: updatedOrder
        });
    } catch( error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


// PUT /api/orders/adminUpdate/:id
exports.updateOrderByAdmin = async (req, res) => {
    const orderId = req.params.id;
    const { status } = req.body;
    // Kiểm tra các trường bắt buộc
    if (!status) {
        return res.status(400).json({ message: "Status is required" });
    }
    try {
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        if(![ 'confirmed', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        order.status = status;
        const updatedOrder = await order.save();
        res.status(200).json({
            message: "Order updated successfully",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

// DELETE /api/orders/delete/:id
exports.deleteOrder = async (req, res) => {
    const orderId = req.params.id;
    try {
        const deletedOrder = await Order.findByIdAndDelete(orderId);
        if (!deletedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }
        res.status(200).json({
            message: "Order deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

