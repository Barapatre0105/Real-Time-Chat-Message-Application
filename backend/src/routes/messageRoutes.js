const express = require('express');
const { sendMessage, getMessages } = require('../controllers/messageController');

const router = express.Router();

// POST /api/messages -> save a new message
router.post('/', sendMessage);

// GET /api/messages -> fetch full chat history
router.get('/', getMessages);

module.exports = router;
