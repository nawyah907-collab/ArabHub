const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Report = sequelize.define('Report', {
  adId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  reason: { type: DataTypes.STRING, allowNull: false },
});

module.exports = Report;