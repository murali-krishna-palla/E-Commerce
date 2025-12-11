import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, onRemove, onUpdateQuantity, onClearCart, onFetchCart }) {
  useEffect(() => {
    onFetchCart();
  }, [onFetchCart]);

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="page-content">
        <h1>Shopping Cart</h1>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <Link to="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="page-content">
      <h1>Shopping Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="item-image" />
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-price">${item.price.toFixed(2)}</p>
              </div>
              <div className="item-quantity">
                <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
              </div>
              <div className="item-total">
                ${(item.price * item.quantity).toFixed(2)}
              </div>
              <button 
                className="btn-remove"
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          <div className="summary-row total">
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <Link to="/checkout" className="btn-checkout">Proceed to Checkout</Link>
          <button className="btn-continue" onClick={onClearCart}>Clear Cart</button>
          <Link to="/" className="btn-continue">Continue Shopping</Link>
        </div>
      </div>
    </div>
  );
}

export default Cart;
