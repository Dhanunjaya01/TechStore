import { useState } from "react";
import "./AIChat.css";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <>
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>

      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <div>
              <h3>TechStore AI</h3>
              <span>🟢 Online</span>
            </div>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="chat-body">
            <div className="bot-message">
              👋 Welcome to TechStore! How can I help you today?
            </div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask TechStore AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            <button>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
