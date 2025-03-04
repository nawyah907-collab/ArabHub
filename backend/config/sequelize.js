// config/sequelize.js
require('dotenv').config();
const { Sequelize } = require('sequelize');

// إنشاء اتصال بقاعدة البيانات باستخدام Sequelize
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
});

// اختبار الاتصال بقاعدة البيانات
sequelize.authenticate()
  .then(() => {
    console.log('Connected to MySQL Database using Sequelize');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;