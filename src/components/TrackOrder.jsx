import { Link } from "react-router-dom";
import "./TrackOrder.css";

function TrackOrder() {
  const order = JSON.parse(localStorage.getItem("latestOrder")) || {};

  const status = order.status || "Order Confirmed";

  const steps = [
    "Order Confirmed",
    "Packed",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  const currentStep = steps.indexOf(status);

  return (
    <div className="track-page">
      <div className="back-container">
        <Link to="/orders">
          <button className="back-btn">← Back</button>
        </Link>
      </div>

      <div className="track-card">
        <h1>Track Order</h1>

        <div className="order-info">
          <p>
            <strong>Order ID:</strong> {order.orderId}
          </p>

          <p>
            <strong>Order Date:</strong> {order.date}
          </p>

          <p>
            <strong>Payment:</strong> {order.paymentMethod}
          </p>

          <p>
            <strong>Total:</strong> ₹
            {Number(order.total).toLocaleString("en-IN")}
          </p>
        </div>

        <div className="timeline">
          {steps.map((step, index) => (
            <div
              key={step}
              className={
                index <= currentStep
                  ? "timeline-step completed"
                  : "timeline-step"
              }
            >
              <div className="circle">{index <= currentStep ? "✓" : ""}</div>

              <span>{step}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrackOrder;
