const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.get('/', auth, orderController.getAllOrders);
router.get('/export', auth, orderController.exportOrders);
router.get('/stats', auth, orderController.getDashboardStats);
router.get('/:id', auth, orderController.getOrderById);
router.put('/:id', auth, orderController.updateOrderStatus);
router.delete('/:id', auth, orderController.deleteOrder);

module.exports = router;
