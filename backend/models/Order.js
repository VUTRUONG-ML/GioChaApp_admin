const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
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
  ],
  totalPrice: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['confirmed', 'completed','notConfirmed', 'cancelled'],
    default: 'notConfirmed'
  },
  address: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ['cash', 'card'],
    default: 'cash'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
