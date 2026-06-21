import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Payment.css";

function Payment({ cartItems }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.02);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + delivery;

  const handlePlaceOrder = () => {
  if (!paymentMethod) {
    alert("⚠️ Please select a payment method");
    return;
  }

  // Save payment method
  localStorage.setItem("paymentMethod", paymentMethod);

  // Create order object
  const order = {
  orderId: "TS" + Date.now(),
  paymentMethod,
  date: new Date().toLocaleDateString(),
  items: cartItems,
  subtotal,
  tax,
  delivery,
  total,
  status: "Order Confirmed",
};

  // Save latest order
  localStorage.setItem(
    "latestOrder",
    JSON.stringify(order)
  );

  // Save all orders history
  const existingOrders =
    JSON.parse(localStorage.getItem("orders")) || [];

  existingOrders.push(order);

  localStorage.setItem(
    "orders",
    JSON.stringify(existingOrders)
  );

  navigate("/success");
};

  return (
    <div className="payment-page">
      <div className="back-container">
        <Link to="/checkout">
          <button className="back-btn">← Back</button>
        </Link>
      </div>

      <h1 className="payment-title">Secure Payment</h1>

      <div className="payment-container">

        <div className="order-summary">
          <h2>Order Summary</h2>

          {cartItems.map((item) => (
            <div key={item.id} className="summary-item">
              <img
                src={item.image}
                alt={item.name}
                className="summary-image"
              />

              <div className="summary-details">
                <h4>{item.name}</h4>
                <p>Qty: {item.quantity}</p>
                <p>₹{item.price.toLocaleString("en-IN")}</p>
              </div>
            </div>
          ))}

          <div className="summary-total">
            <p>
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </p>

            <p>
              <span>Tax</span>
              <span>₹{tax.toLocaleString("en-IN")}</span>
            </p>

            <p>
              <span>Delivery</span>
              <span>
                {delivery === 0 ? "FREE" : `₹${delivery}`}
              </span>
            </p>

            <h3>
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </h3>
          </div>
        </div>

        <div className="payment-card">
          <h2>Select Payment Method</h2>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="UPI"
              checked={paymentMethod === "UPI"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            📱 UPI
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Credit Card"
              checked={paymentMethod === "Credit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Credit Card
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Debit Card"
              checked={paymentMethod === "Debit Card"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            💳 Debit Card
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Net Banking"
              checked={paymentMethod === "Net Banking"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            🏦 Net Banking
          </label>

          <label className="payment-option">
            <input
              type="radio"
              name="payment"
              value="Cash On Delivery"
              checked={paymentMethod === "Cash On Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            🚚 Cash On Delivery
          </label>

          <button
            className="pay-btn"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
        </div>

      </div>
    </div>
  );
}

export default Payment;