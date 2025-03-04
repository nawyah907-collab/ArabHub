const stripe = require('stripe')('sk_test_51Qye4tPxM8T2NrH8YKJVir2ZIQRANxKHMpXSDkPyNdAYgYPsQAIm4u3hI3MwCtaoOXFdVkbrwyj1GXvXH2PscEhg00ui2YXlLh');

exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body; // المبلغ بالسنتات (مثلاً 1000 = 10 دولار)
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    res.status(500).json({ message: 'Error creating payment intent' });
  }
};

exports.subscribeVIP = async (req, res) => {
    const { userId } = req.user;
    try {
      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
  
      user.role = 'vip'; // تحديث دور المستخدم إلى VIP
      await user.save();
      res.json({ message: 'VIP subscription successful' });
    } catch (error) {
      res.status(500).json({ message: 'Error subscribing to VIP' });
    }
  };