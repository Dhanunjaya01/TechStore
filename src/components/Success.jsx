import { Link } from "react-router-dom";
import "./Success.css";

function Success() {
  const order = JSON.parse(localStorage.getItem("latestOrder")) || {};

  const orderId = order.orderId || "N/A";
  const paymentMethod = order.paymentMethod || "Not Selected";
  const orderDate = order.date || "N/A";
  const status = order.status || "Confirmed";

  const cartItems = order.items || [];

  const total = order.total || 0;

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 5);

  return (
    <div className="success-page">
      <div className="back-container">
        <Link to="/payment">
          <button className="back-btn">← Back</button>
        </Link>
      </div>

      <div className="success-card">
        <div className="success-icon">🎉</div>

        <h1>Order Placed Successfully!</h1>

        <p className="success-text">
          Thank you for shopping with TechStore. Your order has been confirmed.
        </p>

        <div className="order-details">
          <div className="detail-row">
            <span>Order ID</span>
            <strong>{orderId}</strong>
          </div>

          <div className="detail-row">
            <span>Payment Method</span>
            <strong>{paymentMethod}</strong>
          </div>

          <div className="detail-row">
            <span>Order Date</span>
            <strong>{orderDate}</strong>
          </div>

          <div className="detail-row">
            <span>Status</span>
            <strong>{status}</strong>
          </div>

          <div className="detail-row">
            <span>Estimated Delivery</span>
            <strong>{deliveryDate.toDateString()}</strong>
          </div>

          <div className="detail-row">
            <span>Total Amount</span>
            <strong>₹{Number(total).toLocaleString("en-IN")}</strong>
          </div>
        </div>

        <h3 className="ordered-title">Ordered Products</h3>

        <div className="ordered-products">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div className="ordered-item" key={item.id}>
                <img src={item.image} alt={item.name} />

                <div>
                  <h4>{item.name}</h4>
                  <p>Qty: {item.quantity}</p>
                </div>

                <strong>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        <div className="success-buttons">
          <Link to="/">
            <button className="continue-btn">Continue Shopping</button>
          </Link>

          <Link to="/orders">
            <button className="orders-btn">View Orders</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Success;
