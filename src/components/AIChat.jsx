import { useState, useRef, useEffect } from "react";
import "./AIChat.css";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [typing, setTyping] = useState(false);

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to TechStore! What are you looking for today?",
    },
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "👋 Hello! How can I help you today?";
    }

    if (msg.includes("phone") || msg.includes("mobile")) {
      return "📱 Nice! Do you prefer Apple, Samsung, Xiaomi or Nothing?";
    }

    if (msg.includes("apple")) {
      return "🍎 We currently have iPhone 17 Pro Max, AirPods Pro 2, Apple Watch Ultra 2 and iPad Pro M4.";
    }

    if (msg.includes("samsung")) {
      return "📱 Samsung Galaxy S25 Ultra, Galaxy Watch 6 and Galaxy Buds are available.";
    }

    if (msg.includes("laptop") || msg.includes("computer")) {
      return "💻 Are you looking for Gaming, Student or Office laptops?";
    }

    if (msg.includes("gaming")) {
      return "🎮 ASUS ROG, Lenovo Legion and Acer Predator are our top gaming laptops.";
    }

    if (msg.includes("headphone") || msg.includes("earbuds")) {
      return "🎧 Sony XM5, AirPods Pro 2, Bose and Samsung Buds are available.";
    }

    if (msg.includes("watch") || msg.includes("smartwatch")) {
      return "⌚ Apple Watch Ultra 2 and Samsung Galaxy Watch 6 are available.";
    }

    if (msg.includes("offer") || msg.includes("discount")) {
      return "🔥 Today's best deals offer up to 30% OFF on selected products.";
    }

    if (msg.includes("delivery") || msg.includes("shipping")) {
      return "🚚 Delivery usually takes 2-7 business days.";
    }

    if (msg.includes("return") || msg.includes("refund")) {
      return "↩️ Easy 7-day return policy is available.";
    }

    if (msg.includes("warranty")) {
      return "🛡️ Most products include 1-2 years manufacturer warranty.";
    }

    if (msg.includes("payment")) {
      return "💳 We accept UPI, Debit Card, Credit Card, Net Banking and COD.";
    }

    if (msg.includes("thanks") || msg.includes("thank you")) {
      return "😊 You're welcome! Happy shopping at TechStore.";
    }

    return "🤖 Tell me what you're interested in:\n📱 Smartphones\n💻 Laptops\n🎧 Headphones\n⌚ Smart Watches\n📺 TVs";
  };

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        sender: "user",
        text: userMessage,
      },
    ]);

    setMessage("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: getReply(userMessage),
        },
      ]);

      setTyping(false);
    }, 1000);
  };

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
              <span>Online</span>
            </div>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="quick-actions">
            <button onClick={() => setMessage("Smartphones")}>📱 Phone</button>

            <button onClick={() => setMessage("Laptop")}>💻 Laptop</button>

            <button onClick={() => setMessage("Headphones")}>🎧 Audio</button>

            <button onClick={() => setMessage("Offers")}>🔥 Offers</button>
          </div>

          <div className="chat-body">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={
                  msg.sender === "user" ? "user-message" : "bot-message"
                }
              >
                {msg.text}
              </div>
            ))}

            {typing && (
              <div className="typing">
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}

            <div ref={chatEndRef}></div>
          </div>

          <div className="chat-footer">
            <input
              type="text"
              placeholder="Ask TechStore AI..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />

            <button onClick={sendMessage}>➤</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
