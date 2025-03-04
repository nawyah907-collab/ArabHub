const Favorite = require('../models/Favorite');

exports.getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.findAll({ where: { userId: req.user.id } });
    res.json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching favorites' });
  }
};