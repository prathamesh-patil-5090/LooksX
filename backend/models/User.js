const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    min: 3,
    max: 20
  },
  email: {
    type: String,
    required: true,
    unique: true,
    max: 50
  },
  password: {
    type: String,
    required: true,
    min: 6
  },
  role: {
    type: String,
    enum: ['customer', 'barber', 'admin'],
    default: 'customer'
  },
  shopName: {
    type: String,
    ref: 'Shop',
    // Only require shopName after shop registration, not during user registration
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
