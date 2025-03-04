const express = require('express');
const { getFavorites } = require('../controllers/favoriteController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/', authenticate, getFavorites);

module.exports = router;