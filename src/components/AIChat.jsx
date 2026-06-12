import { useState } from "react";
import "./AIChat.css";

function AIChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const [messages, setMessages] = useState([
    {
      text: "👋 Welcome to TechStore! Ask me about products, prices, offers, delivery, warranty, returns or support.",
      sender: "bot",
    },
  ]);

  const sendMessage = () => {
    if (!message.trim()) return;

    const userMsg = message.toLowerCase();

    let botReply =
      "🤖 Sorry, I didn't understand that. Please ask about products, pricing, delivery, warranty, returns or support.";

    if (
      userMsg.includes("hello") ||
      userMsg.includes("hi") ||
      userMsg.includes("hey")
    ) {
      botReply = "👋 Hello! Welcome to TechStore.";
    } else if (userMsg.includes("products") || userMsg.includes("items")) {
      botReply =
        "🛍️ We sell Smartphones, Laptops, Smart Watches, Headphones, Tablets and Accessories.";
    } else if (userMsg.includes("iphone")) {
      botReply =
        "📱 We have the latest Apple iPhone models with special discounts.";
    } else if (userMsg.includes("samsung")) {
      botReply =
        "📱 Samsung Galaxy smartphones, tablets and smartwatches are available.";
    } else if (userMsg.includes("laptop") || userMsg.includes("computer")) {
      botReply = "💻 We offer Dell, HP, Lenovo, ASUS, Acer and Apple MacBooks.";
    } else if (userMsg.includes("sony")) {
      botReply =
        "🎧 Sony headphones, cameras and PlayStation consoles are available.";
    } else if (userMsg.includes("price") || userMsg.includes("cost")) {
      botReply =
        "💰 Please tell me the product name and I'll help with pricing.";
    } else if (
      userMsg.includes("offer") ||
      userMsg.includes("discount") ||
      userMsg.includes("deal")
    ) {
      botReply =
        "🔥 Exciting discounts are available on selected TechStore products.";
    } else if (userMsg.includes("delivery") || userMsg.includes("shipping")) {
      botReply =
        "🚚 Delivery usually takes 2-7 business days depending on your location.";
    } else if (userMsg.includes("warranty") || userMsg.includes("guarantee")) {
      botReply =
        "🛡️ Most products come with 1 to 2 years manufacturer warranty.";
    } else if (userMsg.includes("return") || userMsg.includes("refund")) {
      botReply =
        "↩️ Products can be returned within 7 days according to our return policy.";
    } else if (
      userMsg.includes("payment") ||
      userMsg.includes("upi") ||
      userMsg.includes("card")
    ) {
      botReply =
        "💳 We accept UPI, Credit Cards, Debit Cards, Net Banking and Cash on Delivery.";
    } else if (userMsg.includes("support") || userMsg.includes("help")) {
      botReply =
        "📞 TechStore Support is available 24/7 for customer assistance.";
    } else if (userMsg.includes("thank") || userMsg.includes("thanks")) {
      botReply = "😊 You're welcome. Happy shopping at TechStore!";
    }

    setMessages([
      ...messages,
      { text: message, sender: "user" },
      { text: botReply, sender: "bot" },
    ]);

    setMessage("");
  };

  return (
    <>
      {/* Floating Button */}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        🤖
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-box">
          <div className="chat-header">
            <h3>TechStore AI</h3>

            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✕
            </button>
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

            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
    </>
  );
}

export default AIChat;
