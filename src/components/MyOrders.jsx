import { Link } from "react-router-dom";
import "./MyOrders.css";

function MyOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="orders-page">
      {/* Back Button */}

      <div className="back-container">
        <Link to="/success">
          <button className="back-btn">← Back</button>
        </Link>
      </div>

      <h1 className="orders-title">My Orders</h1>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Yet</h2>

          <p>Start shopping to see your orders here.</p>

          <Link to="/products">
            <button className="shop-btn">Shop Now</button>
          </Link>
        </div>
      ) : (
        orders
          .slice()
          .reverse()
          .map((order) => (
            <div className="order-card" key={order.orderId}>
              <div className="order-header">
                <div>
                  <h3>Order #{order.orderId}</h3>

                  <p>{order.date}</p>
                </div>

                <div className="status">{order.status}</div>
              </div>

              <div className="order-info">
                <p>
                  <strong>Payment:</strong> {order.paymentMethod}
                </p>

                <p>
                  <strong>Total:</strong> ₹
                  {Number(order.total).toLocaleString("en-IN")}
                </p>
              </div>

              <div className="order-products">
                {order.items?.map((item) => (
                  <div className="product-row" key={item.id}>
                    <img src={item.image} alt={item.name} />

                    <div className="product-details">
                      <h4>{item.name}</h4>

                      <p>Qty: {item.quantity}</p>
                    </div>

                    <strong>
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </strong>
                  </div>
                ))}
              </div>

              <button className="track-btn">Track Order</button>
            </div>
          ))
      )}
    </div>
  );
}

export default MyOrders;
