const express = require('express');
const { reportAd } = require('../controllers/reportController');
const { authenticate } = require('../middleware/authMiddleware'); // تأكد من استيراد الوظيفة

const router = express.Router();

router.post('/ads/:id/report', authenticate, reportAd);

module.exports = router;