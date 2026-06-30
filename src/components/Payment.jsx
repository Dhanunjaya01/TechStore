import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./Payment.css";
import { checkout } from "../services/checkoutService";

function Payment({ cartItems, setCartItems }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("");

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const tax = Math.round(subtotal * 0.02);
  const delivery = subtotal > 500 ? 0 : 50;
  const total = subtotal + tax + delivery;

  const handlePlaceOrder = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method");
      return;
    }

    try {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      const address = JSON.parse(localStorage.getItem("checkoutAddress"));

      const checkoutRequest = {
        userId: loggedInUser.userId,

        totalAmount: total,

        address: {
          fullName: address.fullName,
          phoneNo: address.phone,
          houseNo: address.address,
          street: address.address,
          landmark: "",
          city: address.city,
          state: address.state,
          pincode: address.pincode,
          country: "India",
          addressType: "Home",
          default: true,
        },

        payment: {
          paymentMethod: paymentMethod,

          amount: total,

          paymentStatus:
            paymentMethod === "Cash On Delivery" ? "Pending" : "Paid",
        },

        cartItems: cartItems,
      };

      const response = await checkout(checkoutRequest);

      if (response.success) {
        setCartItems([]);

        localStorage.removeItem("checkoutAddress");

        alert("🎉 Order Placed Successfully");

        navigate("/success");
      } else {
        alert("Checkout Failed");
      }
    } catch (error) {
      console.error(error);

      alert("Server Error");
    }
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
              <img src={item.image} alt={item.name} className="summary-image" />

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
              <span>{delivery === 0 ? "FREE" : `₹${delivery}`}</span>
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

          <button className="pay-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Payment;
