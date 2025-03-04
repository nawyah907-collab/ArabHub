const Message = require('../models/Message');
const io = require('../app').io;

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.findAll({ where: { userId: req.user.id } });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching messages' });
  }
};

exports.sendMessage = async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  try {
    const message = await Message.create({ senderId, receiverId, content });

    // إرسال إشعار فوري
    io.emit('notification', {
      userId: receiverId,
      message: 'لديك رسالة جديدة',
    });

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};