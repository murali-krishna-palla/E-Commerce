const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce';
mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Routes
const adminRoutes = require('./routes/admin');
const productRoutes = require('./routes/products');
const orderRoutes = require('./routes/orders');

app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Legacy cart endpoints for backwards compatibility
let cart = [];

// Get cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      quantity
    });
  }

  res.json({ message: 'Item added to cart', cart });
});

// Remove from cart
app.delete('/api/cart/:productId', (req, res) => {
  cart = cart.filter(item => item.id !== parseInt(req.params.productId));
  res.json({ message: 'Item removed from cart', cart });
});

// Update cart item quantity
app.put('/api/cart/:productId', (req, res) => {
  const { quantity } = req.body;
  const cartItem = cart.find(item => item.id === parseInt(req.params.productId));
  
  if (!cartItem) {
    return res.status(404).json({ message: 'Item not in cart' });
  }

  if (quantity <= 0) {
    cart = cart.filter(item => item.id !== parseInt(req.params.productId));
  } else {
    cartItem.quantity = quantity;
  }

  res.json({ message: 'Cart updated', cart });
});

// Clear cart
app.delete('/api/cart', (req, res) => {
  cart = [];
  res.json({ message: 'Cart cleared' });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`API Documentation:`);
  console.log(`GET /api/products - Get all products`);
  console.log(`GET /api/cart - Get cart`);
  console.log(`POST /api/cart - Add to cart`);
  console.log(`DELETE /api/cart/:productId - Remove from cart`);
  console.log(`POST /api/checkout - Place order`);
});
