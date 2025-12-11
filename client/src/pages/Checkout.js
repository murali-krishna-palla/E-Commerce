import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Checkout.css';

function Checkout({ cartItems, onClearCart }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState('');

  if (cartItems.length === 0) {
    return (
      <div className="page-content">
        <div className="empty-checkout">
          <h2>Your cart is empty</h2>
          <p>Please add items before checking out.</p>
          <button className="btn-primary" onClick={() => navigate('/')}>
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    setError('');

    // Validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address) {
      setError('Please fill in all required fields');
      setProcessing(false);
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/checkout', {
        customerInfo: formData
      });

      alert(`Order placed successfully! Order ID: ${response.data.order.id}`);
      onClearCart();
      navigate('/');
    } catch (error) {
      setError('Error placing order. Please try again.');
      console.error('Checkout error:', error);
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="page-content">
      <h1>Checkout</h1>
      <div className="checkout-container">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Shipping Information</legend>
            <div className="form-row">
              <input
                type="text"
                name="firstName"
                placeholder="First Name *"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name *"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address *"
              value={formData.address}
              onChange={handleChange}
              required
            />
            <div className="form-row">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={formData.state}
                onChange={handleChange}
              />
              <input
                type="text"
                name="zipCode"
                placeholder="ZIP Code"
                value={formData.zipCode}
                onChange={handleChange}
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Payment Information</legend>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number (4111111111111111)"
              value={formData.cardNumber}
              onChange={handleChange}
              maxLength="16"
            />
            <div className="form-row">
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={formData.expiryDate}
                onChange={handleChange}
              />
              <input
                type="text"
                name="cvv"
                placeholder="CVV"
                value={formData.cvv}
                onChange={handleChange}
                maxLength="3"
              />
            </div>
          </fieldset>

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="btn-place-order"
            disabled={processing}
          >
            {processing ? 'Processing...' : `Place Order - $${total.toFixed(2)}`}
          </button>
        </form>

        <div className="order-summary">
          <h2>Order Summary</h2>
          {cartItems.map(item => (
            <div key={item.id} className="summary-item">
              <span>{item.name} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="summary-total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
