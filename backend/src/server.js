require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');

const messageRoutes = require('./routes/messageRoutes');
const initSocket = require('./sockets/chatSocket');

const PORT = process.env.PORT || 5000;
const CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

const app = express();
app.use(cors({ origin: CLIENT_ORIGIN }));
app.use(express.json());

// REST APIs
app.use('/api/messages', messageRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'Chat backend is running' });
});

// Wrap express app in an HTTP server so Socket.io can attach to the same port.
const server = http.createServer(app);

const io = new Server(server, {
  cors: { origin: CLIENT_ORIGIN, methods: ['GET', 'POST'] },
});

initSocket(io);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
