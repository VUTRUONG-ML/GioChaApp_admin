const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName: {
        type: String,
        required: true,
        unique: true
    },
    foodDescription: {
        type: String,
        required: true
    },
    foodPrice: {
        type: Number,
        required: true,
        min: 0
    },
    foodImage: {
        type: String,
        required: true,
        match: /\.(jpeg|jpg|png|gif|webp)$/
    },
    foodCategoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'FoodCategory',
        required: true
    },


    discount: {
        type: Number,
        default: 0,        // 0 = không giảm giá
        min: 0,
        max: 100
    },
    rating: {
        type: Number,
        default: 4.5,      // hoặc bạn cho ngẫu nhiên 4.3–4.8 tùy ý
        min: 0,
        max: 5
    },
    ingredients: {
        type: [String],    // danh sách thành phần
        default: []
    }

}, {
    timestamps: true
});

module.exports = mongoose.model('Food', foodSchema);
