const Database = require('better-sqlite3');
require('dotenv').config();

const dbPath = process.env.DB_PATH || './chat.db';
const db = new Database(dbPath);

// Create the messages table if it doesn't exist yet.
db.exec(`
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender TEXT NOT NULL,
    text TEXT NOT NULL,
    timestamp TEXT NOT NULL
  )
`);

module.exports = db;
