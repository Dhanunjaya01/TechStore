import { useState } from "react";
import { Link } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registration Successful");
  };

  return (
    <div className="auth-container">
      <Link to="/">
        <button className="home-btn">🏠 Home</button>
      </Link>
      <form className="auth-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button type="submit">Register</button>

        <p>
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
