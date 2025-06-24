const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true, // mỗi user chỉ có 1 giỏ hàng
    ref: 'User'
  },
  items: [
    {
      food: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ]
}, {
  timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);
