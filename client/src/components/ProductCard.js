import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} className="product-image" />
      <h3 className="product-name">{product.name}</h3>
      <p className="product-category">{product.category}</p>
      <p className="product-description">{product.description}</p>
      <div className="product-footer">
        <span className="product-price">${product.price}</span>
        <button 
          className="add-to-cart-btn"
          onClick={() => onAddToCart(product.id, 1)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
