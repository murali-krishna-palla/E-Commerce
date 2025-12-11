# E-Commerce Website

A full-stack e-commerce application built with Node.js, Express, and React.

## Features

- 📦 Product listing and browsing
- 🛒 Shopping cart functionality
- 💳 Checkout and order placement
- 📊 Admin dashboard with order tracking
- 📱 Responsive design

## Project Structure

```
├── server/              # Backend (Node.js + Express)
│   ├── server.js       # Main server file
│   ├── package.json    # Backend dependencies
│   └── .env           # Environment variables
│
└── client/             # Frontend (React)
    ├── public/         # Static files
    ├── src/            # React components and pages
    │   ├── components/ # Reusable components
    │   ├── pages/      # Page components
    │   └── styles/     # CSS files
    └── package.json    # Frontend dependencies
```

## Installation & Setup

### Backend Setup

```bash
cd server
npm install
npm start
```

The backend will run on `http://localhost:5000`

### Frontend Setup

```bash
cd client
npm install
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID

### Cart
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update quantity
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

### Orders
- `POST /api/checkout` - Place order
- `GET /api/orders` - Get all orders (admin)
- `GET /api/orders/:id` - Get order by ID

## Features Included

1. **Product Listing**: Browse products with images, descriptions, and prices
2. **Shopping Cart**: Add/remove items, update quantities
3. **Checkout**: Complete order with shipping and payment info
4. **Admin Dashboard**: View all orders and sales statistics
5. **Responsive Design**: Works on desktop and mobile devices

## Technologies Used

### Backend
- Node.js
- Express.js
- CORS
- dotenv

### Frontend
- React
- React Router DOM
- Axios
- CSS3

## Default Test Credentials

For payment testing:
- Card Number: 4111111111111111
- Any future date for expiry
- Any 3-digit CVV

## How to Use

1. Browse products on the home page
2. Click "Add to Cart" to add items
3. View cart by clicking the cart icon
4. Proceed to checkout
5. Fill in shipping and payment information
6. Place order
7. Visit admin dashboard to see order details

## Mock Data

The application comes with 6 sample products:
- Laptop Pro ($999.99)
- Wireless Mouse ($29.99)
- USB-C Cable ($9.99)
- Mechanical Keyboard ($149.99)
- 4K Monitor ($599.99)
- HD Webcam ($79.99)

Enjoy shopping! 🛍️
