import React from 'react';
import ProductCard from '../components/ProductCard';
import './ProductList.css';

function ProductList({ products, loading, onAddToCart }) {
  if (loading) {
    return <div className="page-content"><p>Loading products...</p></div>;
  }

  return (
    <div className="page-content">
      <h1>Our Products</h1>
      <div className="products-grid">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
