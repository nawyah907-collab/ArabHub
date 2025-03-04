const mysql = require('mysql2');

// تحميل متغيرات البيئة
require('dotenv').config();

// إنشاء اتصال بقاعدة البيانات
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // اسم المستخدم الخاص بك
  password: '1234', // كلمة المرور الخاصة بك
  database: 'listora', // اسم قاعدة البيانات
});

// اختبار الاتصال
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});

module.exports = connection;