const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const db = require('../config/db');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // البحث عن المستخدم في قاعدة البيانات
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
      }

      if (results.length === 0) {
        return res.status(400).json({ message: 'بيانات تسجيل الدخول غير صحيحة' });
      }

      const user = results[0];

      // التحقق من كلمة المرور (يجب تشفير كلمة المرور باستخدام bcrypt)
      if (password !== user.password) {
        return res.status(400).json({ message: 'بيانات تسجيل الدخول غير صحيحة' });
      }

      // إرجاع استجابة نجاح
      res.status(200).json({ message: 'تم تسجيل الدخول بنجاح', token: 'dummy_token' });
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء تسجيل الدخول' });
  }
};


exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // التحقق مما إذا كان البريد الإلكتروني مستخدمًا مسبقًا
    db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        return res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب' });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: 'البريد الإلكتروني مسجل مسبقًا' });
      }

      // إنشاء مستخدم جديد
      db.query(
        'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
        [name, email, password],
        (err, results) => {
          if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب' });
          }

          // إرجاع استجابة نجاح
          res.status(201).json({ message: 'تم إنشاء الحساب بنجاح' });
        }
      );
    });
  } catch (error) {
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'حدث خطأ أثناء إنشاء الحساب' });
  }
};