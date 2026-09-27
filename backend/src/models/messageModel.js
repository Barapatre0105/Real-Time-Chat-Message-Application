const db = require('../config/db');

/**
 * Insert a new message and return the saved row.
 */
function insertMessage(sender, text) {
  const timestamp = new Date().toISOString();
  const stmt = db.prepare(
    'INSERT INTO messages (sender, text, timestamp) VALUES (?, ?, ?)'
  );
  const info = stmt.run(sender, text, timestamp);

  return {
    id: info.lastInsertRowid,
    sender,
    text,
    timestamp,
  };
}

/**
 * Return all messages, oldest first.
 */
function getAllMessages() {
  const stmt = db.prepare('SELECT * FROM messages ORDER BY id ASC');
  return stmt.all();
}

module.exports = { insertMessage, getAllMessages };
