import { Link } from "react-router-dom";
import "./Success.css";

function Success() {
  return (
    <div className="success-page">
      <div className="success-card">
        <h1>🎉 Order Placed Successfully</h1>

        <p>Thank you for shopping with TechStore.</p>

        <p>
          Order ID:
          <strong> #TS1001</strong>
        </p>

        <p>Estimated Delivery: 3-5 Days</p>

        <Link to="/">
          <button>Continue Shopping</button>
        </Link>
      </div>
    </div>
  );
}

export default Success;
