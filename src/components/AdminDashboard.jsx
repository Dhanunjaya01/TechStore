import { Link } from "react-router-dom";
import products from "../data";
import "./AdminDashboard.css";

function AdminDashboard() {
  const orders = JSON.parse(localStorage.getItem("orders")) || [];

  const revenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
  function logout() {
    localStorage.removeItem("isAdmin");
    window.location.href = "/admin-login";
  }
  return (
    <div className="admin-page">
      <div className="admin-header">
        <div className="header-left">
          <Link to="/">
            <button className="small-back-btn">← Back</button>
          </Link>

          <h1 className="admin-title">Admin Dashboard</h1>
        </div>

        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>

      {/* Statistics */}

      <div className="stats-grid">
        <div className="stat-card">
          <h2>{products.length}</h2>
          <p>Products</p>
        </div>

        <div className="stat-card">
          <h2>{orders.length}</h2>
          <p>Orders</p>
        </div>

        <div className="stat-card">
          <h2>₹{revenue.toLocaleString("en-IN")}</h2>
          <p>Revenue</p>
        </div>

        <div className="stat-card">
          <h2>120</h2>
          <p>Users</p>
        </div>
      </div>

      {/* Quick Actions */}

      <div className="admin-section">
        <h2>Quick Actions</h2>

        <div className="action-grid">
          <Link to="/add-product">
            <button>➕ Add Product</button>
          </Link>

          <Link to="/manage-products">
            <button>📦 Manage Products</button>
          </Link>

          <Link to="/manage-orders">
            <button>🛒 Manage Orders</button>
          </Link>

          <Link to="/manage-users">
            <button>👥 Manage Users</button>
          </Link>
        </div>
      </div>

      {/* Recent Orders */}

      <div className="admin-section">
        <h2>Recent Orders</h2>

        {orders.length === 0 ? (
          <p>No Orders Found</p>
        ) : (
          orders
            .slice()
            .reverse()
            .slice(0, 5)
            .map((order) => (
              <div className="order-row" key={order.orderId}>
                <span>{order.orderId}</span>

                <span>₹{Number(order.total).toLocaleString("en-IN")}</span>

                <span>{order.status}</span>
              </div>
            ))
        )}
      </div>

      {/* Low Stock */}

      <div className="admin-section">
        <h2>Low Stock Products</h2>

        {products.slice(0, 5).map((item) => (
          <div className="stock-row" key={item.id}>
            <span>{item.name}</span>

            <span>Stock: {5 + item.id}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDashboard;
