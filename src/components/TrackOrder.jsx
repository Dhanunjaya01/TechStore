import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getOrderDetails } from "../services/orderDetailsService";
import "./TrackOrder.css";

function TrackOrder() {
  const { orderId } = useParams();

  const [items, setItems] = useState([]);
  useEffect(() => {
    async function loadItems() {
      try {
        const data = await getOrderDetails(orderId);

        setItems(data);
      } catch (error) {
        console.error(error);
      }
    }

    loadItems();
  }, [orderId]);
  const status = "Order Confirmed";

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
            <strong>Order ID:</strong> {orderId}
          </p>
        </div>

        <div className="order-products">
          {items.map((item) => (
            <div className="product-row" key={item.orderItemId}>
              <img src={item.imageUrl} alt={item.productName} />

              <div className="product-details">
                <h4>{item.productName}</h4>

                <p>Quantity : {item.quantity}</p>

                <p>Price : ₹{Number(item.price).toLocaleString("en-IN")}</p>

                <p>
                  Subtotal : ₹{Number(item.subtotal).toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          ))}
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
