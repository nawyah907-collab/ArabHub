const express = require('express');
const { createPaymentIntent, subscribeVIP } = require('../controllers/paymentController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create-payment-intent', authenticate, createPaymentIntent);
router.post('/subscribe-vip', authenticate, subscribeVIP);

module.exports = router;