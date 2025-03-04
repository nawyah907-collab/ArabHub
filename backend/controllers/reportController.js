const Ad = require('../models/Ad');
const Report = require('../models/Report');

exports.reportAd = async (req, res) => {
  const { id } = req.params;
  const { reason } = req.body;

  try {
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    await Report.create({
      adId: id,
      userId: req.user.id,
      reason,
    });

    res.json({ message: 'Report submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting report' });
  }
};