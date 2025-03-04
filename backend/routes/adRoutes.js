const express = require('express');
const multer = require('multer');
const { createAd, updateAd, getAds, getAdById, searchAds } = require('../controllers/adController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// إعداد Multer لتحميل الصور
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

// Routes
router.post('/', upload.single('image'), createAd);
router.put('/:id', upload.single('image'), updateAd);
router.get('/', getAds);
router.get('/:id', getAdById);
router.get('/search', searchAds);

module.exports = router;