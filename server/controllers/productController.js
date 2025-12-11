const Product = require('../models/Product');

// Mock data for fallback when MongoDB is not available
const mockProducts = [
  { id: 1, name: 'Laptop Pro', price: 999.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Laptop', description: 'High-performance laptop' },
  { id: 2, name: 'Wireless Mouse', price: 29.99, category: 'Accessories', image: 'https://via.placeholder.com/200?text=Mouse', description: 'Ergonomic wireless mouse' },
  { id: 3, name: 'USB-C Cable', price: 9.99, category: 'Cables', image: 'https://via.placeholder.com/200?text=Cable', description: 'Durable USB-C cable' },
  { id: 4, name: 'Mechanical Keyboard', price: 149.99, category: 'Accessories', image: 'https://via.placeholder.com/200?text=Keyboard', description: 'RGB mechanical keyboard' },
  { id: 5, name: 'Monitor 4K', price: 599.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Monitor', description: '32-inch 4K monitor' },
  { id: 6, name: 'Webcam HD', price: 79.99, category: 'Electronics', image: 'https://via.placeholder.com/200?text=Webcam', description: '1080p HD webcam' }
];

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    // Fall back to mock data if MongoDB is not available
    console.log('Using mock data - MongoDB not available');
    res.json(mockProducts);
  }
};

// Create product
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description, stock } = req.body;

    const product = new Product({
      name,
      price,
      category,
      image,
      description,
      stock
    });

    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update product
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product updated successfully', product });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    // Try mock data as fallback
    const mockProduct = mockProducts.find(p => p.id === parseInt(req.params.id));
    if (mockProduct) {
      res.json(mockProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  }
};
