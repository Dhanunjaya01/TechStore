import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/");
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <button className="profile-back-btn" onClick={() => navigate(-1)}>
          ← Back
        </button>
        {/* Left Sidebar */}
        <div className="profile-sidebar">
          <div className="user-card">
            <div className="avatar">{user?.name?.charAt(0).toUpperCase()}</div>

            <div>
              <p>Hello,</p>
              <h3>{user?.name}</h3>
            </div>
          </div>

          <div className="menu-section">
            <h4>📦 MY ORDERS</h4>
          </div>

          <div className="menu-section">
            <h4>⚙️ ACCOUNT SETTINGS</h4>

            <ul>
              <li>Profile Information</li>
              <li>Manage Addresses</li>
              <li>Notification Preferences</li>
            </ul>
          </div>

          <div className="menu-section">
            <h4>💳 PAYMENTS</h4>

            <ul>
              <li>Saved Cards</li>
              <li>Gift Cards</li>
            </ul>
          </div>
        </div>

        {/* Right Content */}
        <div className="profile-content">
          <div className="content-card">
            <h2>Profile Information</h2>

            <div className="info-row">
              <label>Name</label>
              <input value={user?.name} readOnly />
            </div>

            <div className="info-row">
              <label>Email</label>
              <input value={user?.email} readOnly />
            </div>

            <div className="info-row">
              <label>Membership</label>
              <input value="TechStore Premium" readOnly />
            </div>

            <div className="btn-group">
              <Link to="/">
                <button className="back-btn">Back To Store</button>
              </Link>

              <button className="logout-btn" onClick={logout}>
                Logout
              </button>
            </div>
          </div>

          <div className="reward-card">
            <h3>🎁 Rewards</h3>
            <p>₹2000 Wallet Balance</p>
          </div>

          <div className="reward-card">
            <h3>❤️ Wishlist</h3>
            <p>Your Favorite Products</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
