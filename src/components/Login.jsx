import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.email === email && user.password === password) {
      alert("Login Successful");
    } else {
      alert("Invalid Email or Password");
    }
  };

  return (
    <div className="auth-container">
      <Link to="/">
  <button className="home-btn">🏠 Home</button>
</Link>
      <form className="auth-card" onSubmit={handleLogin}>
        <h1>Sign In</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>

        <p>
          Don't have an account?
          <Link to="/signup"> Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
