# E-Commerce Database & Admin Setup Guide

## Quick Start

### 1. MongoDB Setup

#### Option A: Local MongoDB
```bash
# Windows - Download installer from https://www.mongodb.com/try/download/community
# macOS
brew install mongodb-community

# Linux (Ubuntu/Debian)
sudo apt-get install -y mongodb
sudo service mongod start
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster
4. Click "Connect" and copy connection string
5. Add to `.env`:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority
   ```

### 2. Backend Setup

```bash
cd server
npm install
npm start
```

### 3. Admin User Creation

The system comes with default demo credentials:
- Email: admin@example.com
- Password: admin123

To create a new admin user, use this API call:

```bash
curl -X POST http://localhost:5000/api/admin/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newadmin",
    "email": "newadmin@example.com",
    "password": "securepassword123"
  }'
```

### 4. Access Admin Dashboard

1. Start the server: `npm start` (in server directory)
2. Open browser: `http://localhost:5000/admin.html`
3. Login with credentials:
   - Email: admin@example.com
   - Password: admin123

## Admin Dashboard Features

### Dashboard Tab
- Total orders count
- Total revenue
- Average order value
- Pending orders
- Recent orders list

### Orders Tab
- View all orders
- Filter by status (pending, processing, shipped, delivered, cancelled)
- Update order status and payment status
- Delete orders
- Export orders as CSV

### Products Tab
- View all products
- Add new products
- Edit product details
- Delete products
- Manage inventory

### Settings Tab
- Store name configuration
- Contact email
- Other store settings

## API Usage Examples

### Admin Login
```bash
curl -X POST http://localhost:5000/api/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Response:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "admin": {
    "id": "123456",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### Create Product (Authenticated)
```bash
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "New Product",
    "price": 99.99,
    "category": "Electronics",
    "stock": 50,
    "description": "Product description",
    "image": "https://example.com/image.jpg"
  }'
```

### Get Orders with Filters
```bash
curl -X GET "http://localhost:5000/api/orders?status=pending&limit=10" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Update Order Status
```bash
curl -X PUT http://localhost:5000/api/orders/ORDER_ID \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "status": "shipped",
    "paymentStatus": "completed"
  }'
```

### Get Dashboard Statistics
```bash
curl -X GET http://localhost:5000/api/orders/stats \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Export Orders as CSV
```bash
curl -X GET http://localhost:5000/api/orders/export \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o orders.csv
```

## Environment Variables (.env)

```
# Server Configuration
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/ecommerce
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce?retryWrites=true&w=majority

# Authentication
JWT_SECRET=your_secure_jwt_secret_change_in_production

# Optional: CORS Settings
CORS_ORIGIN=*
```

## Database Models

### Admin Model
```javascript
{
  username: String (unique, required),
  email: String (unique, required),
  password: String (hashed, required),
  role: String (admin or superadmin),
  createdAt: Date
}
```

### Product Model
```javascript
{
  name: String (required),
  price: Number (required),
  category: String,
  image: String,
  description: String,
  stock: Number (default: 100),
  createdAt: Date
}
```

### Order Model
```javascript
{
  orderNumber: String,
  items: [
    {
      productId: ObjectId,
      name: String,
      price: Number,
      quantity: Number
    }
  ],
  customerInfo: {
    firstName: String,
    lastName: String,
    email: String,
    phone: String,
    address: String,
    city: String,
    state: String,
    zipCode: String
  },
  total: Number,
  status: String (pending, processing, shipped, delivered, cancelled),
  paymentStatus: String (pending, completed, failed),
  createdAt: Date,
  updatedAt: Date
}
```

## Troubleshooting

### MongoDB Connection Error
```
Error: MongoDB connection failed
```
**Solution:** Ensure MongoDB is running
```bash
# Windows
mongod

# macOS
brew services start mongodb-community

# Linux
sudo service mongod start
```

### JWT Token Invalid
```
Error: Token is not valid
```
**Solution:** 
- Login again to get a new token
- Ensure token is passed in Authorization header: `Bearer YOUR_TOKEN`

### CORS Error
```
Access to XMLHttpRequest blocked by CORS policy
```
**Solution:** Ensure server includes CORS middleware (already included in server.js)

### Cannot Find Module
```
Error: Cannot find module 'mongoose'
```
**Solution:**
```bash
cd server
npm install
```

## Security Best Practices

1. **Change JWT_SECRET** in production:
   ```bash
   JWT_SECRET=generate_a_long_random_string_here
   ```

2. **Use strong passwords** for admin accounts

3. **Use HTTPS** in production

4. **Implement rate limiting** to prevent brute force attacks

5. **Regular database backups** for MongoDB

6. **Keep dependencies updated:**
   ```bash
   npm update
   npm audit fix
   ```

## Performance Tips

1. **Enable database indexing:**
   ```javascript
   // Mongoose automatically creates indexes
   // Consider adding custom indexes for frequently queried fields
   ```

2. **Use pagination** for large datasets:
   ```
   GET /api/orders?page=1&limit=10
   ```

3. **Cache admin dashboard** statistics:
   - Implement Redis caching
   - Cache statistics for 5-10 minutes

4. **Compress responses:**
   ```bash
   npm install compression
   ```

## Next Steps

1. Set up MongoDB locally or use MongoDB Atlas
2. Update `.env` with your MongoDB connection string
3. Start backend server
4. Access admin dashboard at `http://localhost:5000/admin.html`
5. Create your first products
6. Process test orders
7. Monitor orders through admin dashboard

## Support & Resources

- MongoDB Documentation: https://docs.mongodb.com
- Express.js Guide: https://expressjs.com
- Mongoose ORM: https://mongoosejs.com
- JWT Tokens: https://jwt.io

---

For more information, check the main README.md file.
