const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

// Mock database
let products = [
  { id: 1, name: 'Laptop Pro', price: 999.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Laptop', description: 'High-performance laptop' },
  { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories', image: 'https://via.placeholder.com/200?text=Mouse', description: 'Ergonomic wireless mouse' },
  { id: 3, name: 'USB-C Cable', price: 9.99, category: 'Cables', image: 'https://via.placeholder.com/200?text=Cable', description: 'Durable USB-C cable' },
  { id: 4, name: 'Mechanical Keyboard', price: 149.99, category: 'Accessories', image: 'https://via.placeholder.com/200?text=Keyboard', description: 'RGB mechanical keyboard' },
  { id: 5, name: 'Monitor 4K', price: 599.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Monitor', description: '32-inch 4K monitor' },
  { id: 6, name: 'Webcam HD', price: 79.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Webcam', description: '1080p HD webcam' }
];

let cart = [];
let orders = [];

// Routes

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  res.json(product);
});

// Get cart
app.get('/api/cart', (req, res) => {
  res.json(cart);
});

// Add to cart
app.post('/api/cart', (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find(p => p.id === productId);
  
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  const cartItem = cart.find(item => item.id === productId);
  
  if (cartItem) {
    cartItem.quantity += quantity;
  } else {
    cart.push({
      ...product,
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

// Checkout
app.post('/api/checkout', (req, res) => {
  const { customerInfo } = req.body;
  
  if (cart.length === 0) {
    return res.status(400).json({ message: 'Cart is empty' });
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const order = {
    id: orders.length + 1,
    items: cart,
    customerInfo,
    total,
    status: 'pending',
    createdAt: new Date()
  };

  orders.push(order);
  cart = [];

  res.json({ 
    message: 'Order placed successfully', 
    order: {
      id: order.id,
      total: order.total,
      status: order.status
    }
  });
});

// Get all orders (admin)
app.get('/api/orders', (req, res) => {
  res.json(orders);
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  const order = orders.find(o => o.id === parseInt(req.params.id));
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
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
