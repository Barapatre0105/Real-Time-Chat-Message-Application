import React, { useEffect, useState } from 'react';
import socket from './socket';
import { fetchMessages } from './api';
import MessageList from './components/MessageList';
import MessageInput from './components/MessageInput';
import './App.css';

export default function App() {
  const [username, setUsername] = useState(
    () => localStorage.getItem('chat_username') || ''
  );
  const [nameInput, setNameInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [typingUser, setTypingUser] = useState(null);
  const [error, setError] = useState('');

  // Load chat history once, and connect socket, once a username exists.
  useEffect(() => {
    if (!username) return;

    fetchMessages()
      .then(setMessages)
      .catch(() => setError('Could not load chat history'));

    socket.connect();
    socket.emit('user_online', username);

    socket.on('receive_message', (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    socket.on('online_users', (users) => setOnlineUsers(users));

    socket.on('typing', (user) => {
      if (user !== username) setTypingUser(user);
    });

    socket.on('stop_typing', (user) => {
      setTypingUser((current) => (current === user ? null : current));
    });

    socket.on('error_message', (msg) => setError(msg));

    return () => {
      socket.off('receive_message');
      socket.off('online_users');
      socket.off('typing');
      socket.off('stop_typing');
      socket.off('error_message');
      socket.disconnect();
    };
  }, [username]);

  function handleLogin(e) {
    e.preventDefault();
    const trimmed = nameInput.trim();
    if (!trimmed) return;
    localStorage.setItem('chat_username', trimmed);
    setUsername(trimmed);
  }

  async function handleSend(text) {
    try {
      // Sending over the socket triggers a DB save + broadcast on the server,
      // so we don't also call the REST API here (that would duplicate it).
      socket.emit('send_message', { sender: username, text });
    } catch (err) {
      setError('Failed to send message');
    }
  }

  if (!username) {
    return (
      <div className="login-screen glass-bg">
        <form onSubmit={handleLogin} className="glass-login-form">
          <div className="login-header">
            <h2>Login</h2>
            <p>Welcome back please login to your account</p>
          </div>
          <div className="input-group">
            <input
              type="text"
              placeholder="User Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <span className="input-icon">👤</span>
          </div>
          <button type="submit" className="glass-btn">Login</button>
        </form>
      </div>
    );
  }

  return (
    <div className="chat-app">
      <header className="chat-header">
        <h2>Chat</h2>
        <div className="online-count">{onlineUsers.length} online</div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <MessageList messages={messages} currentUser={username} />

      {typingUser && <div className="typing-indicator">{typingUser} is typing…</div>}

      <MessageInput username={username} onSend={handleSend} />
    </div>
  );
}
