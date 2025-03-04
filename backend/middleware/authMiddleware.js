const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // استخراج JWT من الـ Header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, '2812bfa1868a3677db9bacd9dc751c2de85785a5c29dbf79de18e2a08a8acd8a'); // فك تشفير JWT
    const user = await User.findByPk(decoded.id); // البحث عن المستخدم في قاعدة البيانات

    if (!user) {
      return res.status(401).json({ message: 'Invalid token.' });
    }

    req.user = user; // إضافة المستخدم إلى الطلب
    next(); // الانتقال إلى الوظيفة التالية
  } catch (error) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};