const express = require('express');
const { addRating } = require('../controllers/ratingController'); // تأكد من استيراد الوظيفة
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/ads/:id/rate', authenticate, addRating);

module.exports = router;