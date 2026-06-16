import { Link } from "react-router-dom";
import "./Cart.css";

function Cart({ cartItems }) {
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="cart-page">
      <div className="cart-header-page">
        <Link to="/">
          <button className="cart-back-btn">← Back</button>
        </Link>

        <h1>Your Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <h2>🛒 Your Cart Is Empty</h2>
        </div>
      ) : (
        <>
          <div className="cart-products">
            {cartItems.map((item) => (
              <div className="cart-card" key={item.id}>
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-product-image"
                />

                <div className="cart-info">
                  <h3>{item.name}</h3>

                  <p>₹{item.price.toLocaleString("en-IN")}</p>

                  <span>Quantity: {item.quantity}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-total-card">
            <h2>Total ₹{total.toLocaleString("en-IN")}</h2>

            <button className="checkout-btn">Proceed To Checkout</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
