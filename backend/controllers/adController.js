const Ad = require('../models/Ad');

exports.createAd = async (req, res) => {
  try {
    const { title, description, price, city, category } = req.body;
    const image = req.file ? req.file.filename : null;

    const ad = await Ad.create({ title, description, price, city, category, image });
    res.status(201).json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error creating ad' });
  }
};

exports.updateAd = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });

    const { title, description, price, city, category } = req.body;
    const image = req.file ? req.file.filename : ad.image;

    await ad.update({ title, description, price, city, category, image });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error updating ad' });
  }
};

exports.getAds = async (req, res) => {
  try {
    const ads = await Ad.findAll();
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ads' });
  }
};

exports.getAdById = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await Ad.findByPk(id);
    if (!ad) return res.status(404).json({ message: 'Ad not found' });
    res.json(ad);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching ad details' });
  }
};

exports.searchAds = async (req, res) => {
  const { query, city, category } = req.query;
  try {
    const whereClause = {};
    if (query) whereClause.title = { [Op.like]: `%${query}%` };
    if (city) whereClause.city = city;
    if (category) whereClause.category = category;

    const ads = await Ad.findAll({ where: whereClause });
    res.json(ads);
  } catch (error) {
    res.status(500).json({ message: 'Error searching ads' });
  }
};