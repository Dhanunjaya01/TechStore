import { useState } from "react";
import "./AIChat.css";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "👋 Welcome to TechStore AI Assistant. I can help you find products, compare devices, explain offers, warranty, delivery and more. How can I help you today?",
    },
  ]);

  const getReply = (msg) => {
    msg = msg.toLowerCase();

    if (msg.includes("hello") || msg.includes("hi") || msg.includes("hey")) {
      return "👋 Hello! Welcome to TechStore. How can I help you today?";
    }

    if (msg.includes("phone") || msg.includes("mobile")) {
      return "📱 We have Apple, Samsung, Xiaomi and Nothing smartphones. What's your budget?";
    }

    if (msg.includes("best phone")) {
      return "🏆 Best phones: iPhone 17 Pro Max, Samsung Galaxy S25 Ultra and Xiaomi 15 Ultra.";
    }

    if (msg.includes("apple") || msg.includes("iphone")) {
      return "🍎 Available Apple products: iPhone 17 Pro Max, MacBook Pro M3, Apple Watch Ultra 2 and AirPods Pro.";
    }

    if (msg.includes("samsung")) {
      return "📱 Samsung Galaxy S25 Ultra, Galaxy Watch 6, Galaxy Tab S9 Ultra and Galaxy Buds 3 Pro are available.";
    }

    if (msg.includes("laptop")) {
      return "💻 We have Dell, HP, Lenovo, Acer, ASUS and Apple laptops.";
    }

    if (msg.includes("best laptop")) {
      return "🏆 Best laptops: MacBook Pro M3, Dell XPS 15, HP Spectre x360 and Lenovo Legion Pro 5.";
    }

    if (msg.includes("gaming")) {
      return "🎮 Gaming products: Lenovo Legion Pro 5, Acer Predator Helios 16 and ASUS TUF Gaming devices.";
    }

    if (msg.includes("headphone") || msg.includes("earbuds")) {
      return "🎧 Sony XM5, Bose QuietComfort Ultra, AirPods Pro and Samsung Galaxy Buds 3 Pro are available.";
    }

    if (msg.includes("watch") || msg.includes("smartwatch")) {
      return "⌚ Apple Watch Ultra 2 and Samsung Galaxy Watch 6 are available.";
    }

    if (msg.includes("tv")) {
      return "📺 We offer Samsung Neo QLED TVs and Sony Bravia 4K Smart TVs.";
    }

    if (msg.includes("camera")) {
      return "📸 Sony Alpha 7 IV Mirrorless Camera is available.";
    }

    if (msg.includes("offer") || msg.includes("discount")) {
      return "🔥 Great deals available! Selected products have discounts up to 30% OFF.";
    }

    if (msg.includes("delivery") || msg.includes("shipping")) {
      return "🚚 Delivery usually takes 2-7 business days depending on your location.";
    }

    if (msg.includes("payment")) {
      return "💳 We accept UPI, Credit Cards, Debit Cards, Net Banking and EMI.";
    }

    if (msg.includes("return")) {
      return "↩️ We provide an easy 7-day return policy on eligible products.";
    }

    if (msg.includes("refund")) {
      return "💸 Refunds are processed within 3-7 business days after approval.";
    }

    if (msg.includes("warranty")) {
      return "🛡️ Most products come with a manufacturer warranty of 1-2 years.";
    }

    if (msg.includes("cart")) {
      return "🛒 Products added to Cart are ready for checkout and payment.";
    }

    if (msg.includes("wishlist")) {
      return "❤️ Products added to Wishlist can be viewed anytime from the Wishlist page.";
    }

    if (msg.includes("support")) {
      return "📞 TechStore support is available 24/7 for product and order assistance.";
    }

    if (msg.includes("thank")) {
      return "😊 You're welcome! Happy shopping at TechStore.";
    }

    return "🤖 I can help with phones, laptops, TVs, gaming devices, delivery, warranty, offers and product recommendations.";
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
      {
        sender: "bot",
        text: getReply(userMessage),
      },
    ]);

    setMessage("");
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
              <span>🟢 Online</span>
            </div>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
          </div>

          <div className="quick-actions">
            <button onClick={() => setMessage("Best Phone")}>📱 Phone</button>

            <button onClick={() => setMessage("Best Laptop")}>💻 Laptop</button>

            <button onClick={() => setMessage("Offers")}>🔥 Offers</button>

            <button onClick={() => setMessage("Delivery")}>🚚 Delivery</button>
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
