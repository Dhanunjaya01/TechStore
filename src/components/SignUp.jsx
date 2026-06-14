import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function SignUp() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Name Validation
    if (name.trim().length < 3) {
      alert("❌ Name must contain at least 3 characters");
      return;
    }

    // Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      alert("❌ Please enter a valid email address");
      return;
    }

    // Password Validation
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!passwordRegex.test(password)) {
      alert(
        "❌ Password must contain:\n\n• Minimum 8 characters\n• 1 Uppercase Letter\n• 1 Lowercase Letter\n• 1 Number",
      );
      return;
    }

    // Confirm Password Validation
    if (password !== confirmPassword) {
      alert("❌ Passwords do not match");
      return;
    }

    // Check Existing User
    const existingUser = JSON.parse(localStorage.getItem("user"));

    if (existingUser && existingUser.email === email) {
      alert("❌ Account already exists with this email");
      return;
    }

    const user = {
      name,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    localStorage.setItem("isLoggedIn", "true");

    alert(`🎉 Welcome ${name}! Account Created Successfully`);

    navigate("/profile");
  };

  return (
    <div className="auth-container">
      <Link to="/">
        <button className="home-btn">🏠 Home</button>
      </Link>

      <form className="auth-card" onSubmit={handleSignup}>
        <h1>Create Account</h1>
        <p>Join TechStore and start shopping</p>

        <div className="input-group">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Create Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="primary-btn">
          Create Account
        </button>

        <div className="divider">OR</div>

        <button type="button" className="google-btn">
          Continue with Google
        </button>

        <p className="bottom-text">
          Already have an account?
          <Link to="/login"> Sign In</Link>
        </p>
      </form>
    </div>
  );
}

export default SignUp;
