import React, { useRef, useState } from 'react';
import socket from '../socket';

export default function MessageInput({ username, onSend }) {
  const [text, setText] = useState('');
  const typingTimeout = useRef(null);

  function handleChange(e) {
    setText(e.target.value);

    socket.emit('typing', username);
    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socket.emit('stop_typing', username);
    }, 1000);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed) return;

    onSend(trimmed);
    setText('');
    socket.emit('stop_typing', username);
  }

  return (
    <form className="message-input" onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={handleChange}
        placeholder="Type a message..."
      />
      <button type="submit">Send</button>
    </form>
  );
}
