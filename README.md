# E-Commerce Website

A full-stack e-commerce application built with Node.js, Express, React, and MongoDB with advanced admin dashboard and database connectivity.

## Features

### Customer Features
- 📦 Product listing and browsing
- 🛒 Shopping cart functionality
- 💳 Checkout and order placement
- 📱 Responsive design
- 🔍 Product search and filtering

### Admin Features
- 📊 Comprehensive dashboard with real-time statistics
- 📋 Order management with status tracking
- 📁 Product management (Create, Read, Update, Delete)
- 💰 Revenue tracking and analytics
- 📊 Order filtering and pagination
- 📥 CSV export functionality
- 🔐 Secure admin authentication with JWT

## Project Structure

```
├── server/                      # Backend (Node.js + Express)
│   ├── controllers/             # Business logic
│   │   ├── adminController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   ├── models/                  # Database schemas
│   │   ├── Admin.js
│   │   ├── Order.js
│   │   └── Product.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── routes/                  # API routes
│   │   ├── admin.js
│   │   ├── orders.js
│   │   └── products.js
│   ├── server.js                # Main server file
│   └── package.json
│
├── client/                      # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── styles/
│   └── package.json
│
├── index.html                   # Landing page
├── admin.html                   # Admin dashboard
├── README.md
└── .env                         # Environment variables
```

## Installation & Setup

### Prerequisites
- Node.js v14+ and npm
- MongoDB (local or cloud)
- Git

### Backend Setup

```bash
cd server
npm install
```

Update `.env` file with your MongoDB connection string:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key
```

Start the server:
```bash
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

## Database Setup

### MongoDB Installation

**Local MongoDB:**
```bash
# Windows
# Download and install from https://www.mongodb.com/try/download/community

# macOS
brew tap mongodb/brew
brew install mongodb-community

# Linux
sudo apt-get install -y mongodb
```

**Cloud MongoDB (MongoDB Atlas):**
1. Create account at https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string
4. Add to `.env` file

## API Endpoints

### Admin Authentication
- `POST /api/admin/register` - Register new admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (requires auth)

### Products (Protected Routes)
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Orders (Protected Routes)
- `GET /api/orders` - Get all orders (admin only)
- `GET /api/orders/:id` - Get order by ID (admin only)
- `PUT /api/orders/:id` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)
- `GET /api/orders/stats` - Get dashboard statistics (admin only)
- `GET /api/orders/export` - Export orders as CSV (admin only)

### Cart (Public)
- `GET /api/cart` - Get cart
- `POST /api/cart` - Add to cart
- `PUT /api/cart/:productId` - Update cart item
- `DELETE /api/cart/:productId` - Remove from cart
- `DELETE /api/cart` - Clear cart

## Admin Dashboard

### Access Admin Dashboard
1. Navigate to `http://localhost:5000/admin.html`
2. Login with credentials:
   - **Email:** admin@example.com
   - **Password:** admin123

### Features
- **Dashboard Tab:** View total orders, revenue, and pending orders
- **Orders Tab:** Manage all orders with filtering and status updates
- **Products Tab:** Add, edit, and delete products
- **Settings Tab:** Configure store settings

## How to Use

### For Customers
1. Browse products on the home page
2. Click "Add to Cart" to add items
3. View cart and adjust quantities
4. Proceed to checkout
5. Fill in shipping and payment information
6. Place order

### For Admins
1. Login to admin dashboard
2. View real-time statistics and recent orders
3. Manage orders (update status, view details, delete)
4. Manage products (add new, edit, delete)
5. Export order data as CSV
6. Track revenue and order trends

## Database Schema

### Admin Schema
```javascript
{
  username: String,
  email: String,
  password: String (hashed),
  role: String (admin/superadmin),
  createdAt: Date
}
```

### Product Schema
```javascript
{
  name: String,
  price: Number,
  category: String,
  image: String,
  description: String,
  stock: Number,
  createdAt: Date
}
```

### Order Schema
```javascript
{
  orderNumber: String,
  items: Array,
  customerInfo: Object,
  total: Number,
  status: String (pending/processing/shipped/delivered/cancelled),
  paymentStatus: String (pending/completed/failed),
  createdAt: Date,
  updatedAt: Date
}
```

## Default Test Credentials

### Admin Login
- Email: admin@example.com
- Password: admin123

### Payment Testing
- Card Number: 4111111111111111
- Any future date for expiry
- Any 3-digit CVV

## Sample Products

1. Laptop Pro - $999.99
2. Wireless Mouse - $29.99
3. USB-C Cable - $9.99
4. Mechanical Keyboard - $149.99
5. 4K Monitor - $599.99
6. HD Webcam - $79.99

## Technologies Used

### Backend
- Node.js - JavaScript runtime
- Express.js - Web framework
- MongoDB - NoSQL database
- Mongoose - MongoDB ORM
- JWT - Authentication
- bcryptjs - Password hashing
- CORS - Cross-origin requests

### Frontend
- React - UI framework
- React Router - Navigation
- Axios - HTTP client
- CSS3 - Styling
- HTML5 - Markup

## Environment Variables

Create a `.env` file in the server directory:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_jwt_secret_key_change_in_production
```

## Deployment

### Heroku Deployment
```bash
# Create Heroku app
heroku create your-app-name

# Add MongoDB addon
heroku addons:create mongolab

# Deploy
git push heroku main
```

### Docker Deployment
```dockerfile
FROM node:16
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 5000
CMD ["npm", "start"]
```

## Contributing
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, email support@ecommerce.com or open an issue on GitHub.

## Roadmap
- [ ] Payment gateway integration (Stripe/PayPal)
- [ ] User authentication and profiles
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Email notifications
- [ ] Advanced analytics and reports
- [ ] Mobile app (React Native)
- [ ] Multi-language support

---

Built with ❤️ for seamless e-commerce experiences

