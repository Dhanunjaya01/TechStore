import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { register } from "../services/authService";

function SignUp() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [gender, setGender] = useState("Male");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignup = async (e) => {
    e.preventDefault();

    if (!firstName.trim()) {
      alert("First Name is required");
      return;
    }

    if (!lastName.trim()) {
      alert("Last Name is required");
      return;
    }

    if (!email.trim()) {
      alert("Email is required");
      return;
    }

    if (!phoneNo.trim()) {
      alert("Phone Number is required");
      return;
    }

    if (!dateOfBirth) {
      alert("Select Date of Birth");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        phoneNo,
        gender,
        dateOfBirth,
      });

      alert("Registration Successful");

      navigate("/login");
    } catch (error) {
      alert(error.message);
    }
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
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
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
            type="text"
            placeholder="Phone Number"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
        </div>
        <div className="input-group">
          <select value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="input-group">
          <input
            type="date"
            value={dateOfBirth}
            onChange={(e) => setDateOfBirth(e.target.value)}
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
