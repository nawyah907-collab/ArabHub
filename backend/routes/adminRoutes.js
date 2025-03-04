const express = require('express');
const { getUsers, deleteUser } = require('../controllers/adminController');

const router = express.Router();

// تحقق من أن المستخدم هو مسؤول
router.use((req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Access denied' });
  }
});

router.get('/users', getUsers);
router.delete('/users/:id', deleteUser);

module.exports = router;