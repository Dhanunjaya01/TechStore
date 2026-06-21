import { Link } from "react-router-dom";
import "./ManageOrders.css";

function ManageOrders() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  return (
    <div className="orders-page">
      <div className="orders-header">
        <Link to="/admin">
          <button className="back-btn">← Dashboard</button>
        </Link>

        <h1>Manage Orders</h1>
      </div>

      {orders.length === 0 ? (
        <div className="empty-orders">
          <h2>No Orders Found</h2>
          <p>Orders will appear here after customers place orders.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}

          <div className="orders-table-container">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Payment</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>

                    <td>{order.date}</td>

                    <td>₹{order.total?.toLocaleString("en-IN")}</td>

                    <td>{order.paymentMethod}</td>

                    <td>
                      <span className="status">{order.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}

          <div className="mobile-orders">
            {orders.map((order) => (
              <div className="order-card" key={order.orderId}>
                <div className="order-card-header">
                  <span className="order-id">{order.orderId}</span>

                  <span className="status">{order.status}</span>
                </div>

                <p>📅 {order.date}</p>

                <p>💳 {order.paymentMethod}</p>

                <p>💰 ₹{order.total?.toLocaleString("en-IN")}</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ManageOrders;
