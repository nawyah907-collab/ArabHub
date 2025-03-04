const Rating = require('../models/Rating');

exports.addRating = async (req, res) => {
  const { adId, rating } = req.body;
  const userId = req.user.id;

  try {
    const newRating = await Rating.create({
      adId,
      userId,
      rating,
    });

    res.json({ message: 'Rating added successfully', rating: newRating });
  } catch (error) {
    console.error('Error adding rating:', error);
    res.status(500).json({ message: 'Error adding rating' });
  }
};