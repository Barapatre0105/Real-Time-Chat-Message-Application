import React, { useEffect, useRef } from 'react';

function formatTime(isoString) {
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function MessageList({ messages, currentUser }) {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="message-list">
      {messages.map((msg) => {
        const isMine = msg.sender === currentUser;
        return (
          <div
            key={msg.id ?? `${msg.sender}-${msg.timestamp}`}
            className={`message-row ${isMine ? 'mine' : 'theirs'}`}
          >
            {!isMine && <div className="avatar">👤</div>}
            <div className="message-content">
              {!isMine && <div className="message-sender">{msg.sender}</div>}
              <div className="message-bubble">
                <div className="message-text">{msg.text}</div>
                <div className="message-time">{formatTime(msg.timestamp)}</div>
              </div>
            </div>
            {isMine && <div className="avatar">👤</div>}
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
