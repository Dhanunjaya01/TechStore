import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOrders } from "../services/orderHistoryService";
import "./MyOrders.css";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadOrders() {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

        if (!loggedInUser) {
          setLoading(false);

          return;
        }

        const data = await getOrders(loggedInUser.userId);

        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadOrders();
  }, []);
  if (loading) {
    return (
      <h2
        style={{
          color: "white",
          textAlign: "center",
          marginTop: "100px",
        }}
      >
        Loading Orders...
      </h2>
    );
  }
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
                <p>Products will be displayed in the next step.</p>
              </div>

              <Link to={`/track-order/${order.orderId}`}>
                <button className="track-btn">Track Order</button>
              </Link>
            </div>
          ))
      )}
    </div>
  );
}

export default MyOrders;
