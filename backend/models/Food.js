const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    foodName:{
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
        required: true,
    }
},
    {
        timestamps: true 
    }
);


module.exports = mongoose.model('Food', foodSchema);
