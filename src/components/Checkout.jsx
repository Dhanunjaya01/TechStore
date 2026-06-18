import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    const { fullName, phone, email, address, city, state, pincode } = formData;
    if (
      !fullName ||
      !phone ||
      !email ||
      !address ||
      !city ||
      !state ||
      !pincode
    ) {
      setError("⚠️ Please fill all required fields.");
      return;
    }

    setError("");
    navigate("/payment");
  };

  return (
    <div className="checkout-page">
      <div className="back-container">
        <Link to="/">
          <button className="back-btn">← Back</button>
        </Link>
      </div>

      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-form">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
        />

        <textarea
          rows="4"
          name="address"
          placeholder="Delivery Address"
          value={formData.address}
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          value={formData.city}
          onChange={handleChange}
        />

        <input
          type="text"
          name="state"
          placeholder="State"
          value={formData.state}
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          value={formData.pincode}
          onChange={handleChange}
        />
        {error && <p className="error-message">{error}</p>}
        <button className="checkout-btn" onClick={handleSubmit}>
          Continue To Payment
        </button>
      </div>
    </div>
  );
}

export default Checkout;
