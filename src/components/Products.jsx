import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import products from "../data";
import ProductCard from "./ProductCard";
import "./Products.css";

function Products({
  wishlist,
  toggleWishlist,
  addToCart,
  cartItems,
  setCartItems,
}) {
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const allBrands = [...new Set(products.map((p) => p.brand))];

  let filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
  }

  function removeFromCart(productId) {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId),
    );
  }

  function updateQuantity(productId, change) {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === productId
            ? {
                ...item,
                quantity: item.quantity + change,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <>
      {isCartOpen && (
        <div className="cart-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="cart-sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="cart-header">
              <h2>Your Cart ({cartCount})</h2>

              <button
                className="cart-close"
                onClick={() => setIsCartOpen(false)}
              >
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
                  <div key={item.id} className="cart-item">
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
                        <button onClick={() => updateQuantity(item.id, -1)}>
                          −
                        </button>

                        <span>{item.quantity}</span>

                        <button onClick={() => updateQuantity(item.id, 1)}>
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
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

                <button className="btn-checkout-full">
                  Proceed To Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="products-page">
        {/* HEADER */}

        <div className="products-header">
          <Link to="/">
            <button className="back-btn">← Back</button>
          </Link>

          <h1 className="products-title">All Products</h1>
        </div>

        {/* FILTERS */}

        <div className="filter-controls">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />

          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="filter-select"
          >
            <option value="All">All Brands</option>

            {allBrands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="default">Sort By</option>
            <option value="price-low">Price Low → High</option>
            <option value="price-high">Price High → Low</option>
            <option value="rating">Highest Rating</option>
          </select>
        </div>

        {/* RESULTS */}

        <div className="results-count">
          Showing {filteredProducts.length} Products
        </div>

        {/* PRODUCTS */}

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isWishlisted={wishlist.includes(product.id)}
              onToggleWishlist={() => toggleWishlist(product.id)}
              onAddToCart={() => {
                addToCart(product);
                setIsCartOpen(true);
              }}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default Products;
