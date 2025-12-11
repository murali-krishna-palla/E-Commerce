import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header({ cartCount }) {
  return (
    <header className="header">
      <div className="header-content">
        <Link to="/" className="logo">
          <h1>🛍️ E-Store</h1>
        </Link>
        <nav className="nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/cart" className="nav-link cart-link">
            🛒 Cart ({cartCount})
          </Link>
          <Link to="/admin" className="nav-link">Admin</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
