import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("❌ Email is required");
      return;
    }

    if (!password.trim()) {
      alert("❌ Password is required");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      localStorage.setItem("isLoggedIn", "true");

      alert(`🎉 Welcome Back ${user.name}!`);

      navigate("/profile");
    }
  };

  return (
    <div className="auth-container">
      <Link to="/">
        <button className="home-btn">🏠 Home</button>
      </Link>

      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Welcome Back</h1>
        <p>Login to continue shopping</p>

        <div className="input-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="primary-btn">
          Sign In
        </button>

        <div className="divider">OR</div>

        <button type="button" className="google-btn">
          Continue with Google
        </button>

        <p className="bottom-text">
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
