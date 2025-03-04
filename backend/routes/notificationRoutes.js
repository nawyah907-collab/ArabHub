const express = require('express');
const { getNotifications } = require('../controllers/notificationController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getNotifications);

module.exports = router;