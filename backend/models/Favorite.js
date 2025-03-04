const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Favorite = sequelize.define('Favorite', {
  adId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = Favorite;