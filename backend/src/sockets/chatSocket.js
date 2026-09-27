const { insertMessage } = require('../models/messageModel');

// username -> Set of socket ids (a user can be connected from multiple tabs)
const onlineUsers = new Map();

function broadcastOnlineUsers(io) {
  io.emit('online_users', Array.from(onlineUsers.keys()));
}

function initSocket(io) {
  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    // Client announces who they are right after connecting.
    socket.on('user_online', (username) => {
      if (!username) return;
      socket.data.username = username;

      if (!onlineUsers.has(username)) {
        onlineUsers.set(username, new Set());
      }
      onlineUsers.get(username).add(socket.id);

      broadcastOnlineUsers(io);
    });

    // Incoming chat message.
    socket.on('send_message', (payload) => {
      try {
        const { sender, text } = payload || {};
        if (!sender || !text || !text.trim()) {
          socket.emit('error_message', 'Message must include sender and text');
          return;
        }

        const saved = insertMessage(sender.trim(), text.trim());
        io.emit('receive_message', saved); // broadcast to everyone, including sender
      } catch (err) {
        console.error('Error handling send_message:', err);
        socket.emit('error_message', 'Failed to send message');
      }
    });

    // Typing indicator.
    socket.on('typing', (username) => {
      socket.broadcast.emit('typing', username);
    });

    socket.on('stop_typing', (username) => {
      socket.broadcast.emit('stop_typing', username);
    });

    socket.on('disconnect', () => {
      const username = socket.data.username;
      if (username && onlineUsers.has(username)) {
        onlineUsers.get(username).delete(socket.id);
        if (onlineUsers.get(username).size === 0) {
          onlineUsers.delete(username);
        }
        broadcastOnlineUsers(io);
      }
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });
}

module.exports = initSocket;
