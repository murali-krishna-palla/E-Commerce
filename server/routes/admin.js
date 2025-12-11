const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const auth = require('../middleware/auth');

router.post('/register', adminController.register);
router.post('/login', adminController.login);
router.get('/profile', auth, adminController.getProfile);

module.exports = router;
