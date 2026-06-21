import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  function handleLogin(e) {
    e.preventDefault();

    if (email === "admin@techstore.com" && password === "admin123") {
      localStorage.setItem("isAdmin", "true");

      navigate("/admin");
    } else {
      alert("Invalid Admin Credentials");
    }
  }

  return (
    <div className="admin-login-page">
      <div className="login-container">
        <Link to="/">
          <button className="login-back-btn">← Back</button>
        </Link>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <h1>Admin Login</h1>

          <input
            type="email"
            placeholder="Admin Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" className="admin-login-btn">
            Login
          </button>

          <p className="admin-info">TechStore Admin Portal</p>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
