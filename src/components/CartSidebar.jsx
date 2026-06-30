import { useNavigate } from "react-router-dom";
import { getCart, updateCart, deleteCart } from "../services/cartService";

function CartSidebar({ isCartOpen, setIsCartOpen, cartItems, setCartItems }) {
  const navigate = useNavigate();

  async function reloadCart() {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) return;

    const cart = await getCart(loggedInUser.userId);

    const formattedCart = cart.map((item) => ({
      cartId: item.cartId,
      id: item.productId,
      name: item.productName,
      brand: item.brand,
      price: item.price,
      image: item.imageUrl,
      quantity: item.quantity,
    }));

    setCartItems(formattedCart);
  }

  async function removeFromCart(cartId) {
    try {
      await deleteCart(cartId);
      await reloadCart();
    } catch (e) {
      console.error(e);
    }
  }

  async function updateQuantity(cartId, quantity) {
    try {
      if (quantity <= 0) {
        await removeFromCart(cartId);
        return;
      }

      await updateCart(cartId, quantity);
      await reloadCart();
    } catch (e) {
      console.error(e);
    }
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  if (!isCartOpen) return null;

  return (
    <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
      <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2>Your Cart ({cartCount})</h2>

          <button className="cart-close" onClick={() => setIsCartOpen(false)}>
            ✕
          </button>
        </div>

        <div className="cart-items">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <span className="cart-empty-icon">🛒</span>

              <p>Your cart is empty</p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.cartId} className="cart-item">
                <img
                  src={item.image}
                  alt={item.name}
                  className="cart-item-image"
                />

                <div className="cart-item-details">
                  <h4>{item.name}</h4>

                  <p className="cart-item-price">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>

                  <div className="quantity-controls">
                    <button
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity - 1)
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        updateQuantity(item.cartId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  className="cart-item-remove"
                  onClick={() => removeFromCart(item.cartId)}
                >
                  🗑️
                </button>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-subtotal">
              <span>Subtotal:</span>

              <span className="cart-subtotal-price">
                ₹{cartTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              className="btn-checkout-full"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartSidebar;
