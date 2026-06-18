import { useNavigate } from "react-router-dom";
import "./Payment.css";

function Payment() {
  const navigate = useNavigate();

  return (
    <div className="payment-page">
      <h1>Payment</h1>

      <div className="payment-card">
        <h2>Select Payment Method</h2>

        <label>
          <input type="radio" name="payment" />
          UPI
        </label>

        <label>
          <input type="radio" name="payment" />
          Credit Card
        </label>

        <label>
          <input type="radio" name="payment" />
          Debit Card
        </label>

        <label>
          <input type="radio" name="payment" />
          Cash On Delivery
        </label>

        <button className="pay-btn" onClick={() => navigate("/success")}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Payment;
