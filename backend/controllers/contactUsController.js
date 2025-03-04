exports.sendMessage = async (req, res) => {
  const { email, message } = req.body;
  try {
    // يمكنك هنا إرسال البريد الإلكتروني أو حفظ الرسالة في قاعدة البيانات
    console.log(`Message from ${email}: ${message}`);
    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending message' });
  }
};