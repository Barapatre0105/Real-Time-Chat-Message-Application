const { insertMessage, getAllMessages } = require('../models/messageModel');

function sendMessage(req, res) {
  try {
    const { sender, text } = req.body;

    if (!sender || !text || !text.trim()) {
      return res.status(400).json({ error: 'sender and text are required' });
    }

    const message = insertMessage(sender.trim(), text.trim());
    return res.status(201).json(message);
  } catch (err) {
    console.error('Error saving message:', err);
    return res.status(500).json({ error: 'Failed to save message' });
  }
}

function getMessages(req, res) {
  try {
    const messages = getAllMessages();
    return res.status(200).json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err);
    return res.status(500).json({ error: 'Failed to fetch messages' });
  }
}

module.exports = { sendMessage, getMessages };
