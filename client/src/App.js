import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/products');
      setProducts(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart');
      setCart(response.data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      await axios.post('http://localhost:5000/api/cart', {
        productId,
        quantity
      });
      fetchCart();
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`);
      fetchCart();
    } catch (error) {
      console.error('Error removing from cart:', error);
    }
  };

  const updateCartQuantity = async (productId, quantity) => {
    try {
      await axios.put(`http://localhost:5000/api/cart/${productId}`, {
        quantity
      });
      fetchCart();
    } catch (error) {
      console.error('Error updating cart:', error);
    }
  };

  const clearCart = async () => {
    try {
      await axios.delete('http://localhost:5000/api/cart');
      fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header cartCount={cart.length} />
        <Routes>
          <Route 
            path="/" 
            element={
              <ProductList 
                products={products} 
                loading={loading} 
                onAddToCart={addToCart}
              />
            } 
          />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cart} 
                onRemove={removeFromCart}
                onUpdateQuantity={updateCartQuantity}
                onClearCart={clearCart}
                onFetchCart={fetchCart}
              />
            } 
          />
          <Route 
            path="/checkout" 
            element={
              <Checkout 
                cartItems={cart} 
                onClearCart={clearCart}
              />
            } 
          />
          <Route path="/admin" element={<AdminDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
