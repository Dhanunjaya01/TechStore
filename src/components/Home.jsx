import ProductCard from "./ProductCard";
import { useState, useEffect } from "react";
import { getAllProducts } from "../services/productService";
import "../App.css";
import CartSidebar from "./CartSidebar";

import { Link, useNavigate } from "react-router-dom";
import AIChat from "./AIChat";

function Home({
  wishlist,
  toggleWishlist,
  cartItems,
  addToCart,
  setCartItems,
}) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();

        const formattedProducts = data.map((product) => ({
          id: product.productId,
          name: product.productName,
          brand: product.brand,
          category: product.category,
          description: product.description,
          price: product.price,
          discount: product.discountPercent,
          rating: product.rating,
          stock: product.stock,
          image: product.imageUrl,
        }));

        setProducts(formattedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
  //BRANDS
  const allBrands = [...new Set(products.map((p) => p.brand))];

  // Search - what user types in search box
  const [searchTerm, setSearchTerm] = useState("");

  // Brand Filter - which brand is selected ('All' means show all)
  const [selectedBrand, setSelectedBrand] = useState("All");

  // Sort - how to sort products
  const [sortBy, setSortBy] = useState("default");

  // NEW: Dark Mode Toggle
  const [isDarkMode, setIsDarkMode] = useState(true);

  // NEW: Cart Sidebar Toggle
  const [isCartOpen, setIsCartOpen] = useState(false);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  //WISHLIST FUNCTION

  //STEP 1 : FILTER BASED ON SEARCH AND BRAND

  let filteredProducts = products.filter((product) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch =
      product.name.toLowerCase().includes(searchLower) ||
      product.brand.toLowerCase().includes(searchLower);

    const matchesBrand =
      selectedBrand === "All" || product.brand === selectedBrand;

    return matchesSearch && matchesBrand;
  });

  //STEP 2 : SORT BASED ON FILTERED PRODUCTS
  if (sortBy === "price-low") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortBy === "price-high") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    filteredProducts = [...filteredProducts].sort(
      (a, b) => b.rating - a.rating,
    );
  }

  return (
    <>
      <div>
        <>
          <div className={`app ${isDarkMode ? "dark" : "light"}`}>
            {/* Navigation */}
            <nav className="navbar">
              <div className="nav-container">
                <a href="/" className="logo">
                  <span className="logo-symbol">T</span>
                  <span className="logo-text">TechStore</span>
                </a>

                <ul className="nav-links">
                  <li>
                    <Link to="/products" className="nav-link">
                      Products
                    </Link>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Deals
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      Support
                    </a>
                  </li>
                  <li>
                    <a href="#" className="nav-link">
                      About
                    </a>
                  </li>
                </ul>

                <div className="nav-actions">
                  {/* Dark Mode Toggle */}
                  <button
                    className="nav-btn icon-btn theme-toggle"
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    title={
                      isDarkMode
                        ? "Switch to Light Mode"
                        : "Switch to Dark Mode"
                    }
                  >
                    {isDarkMode ? "☀️" : "🌙"}
                  </button>

                  {/* Wishlist Button with Count */}
                  <Link to="/wishlist">
                    <button className="nav-btn icon-btn">
                      ❤️
                      {wishlist.length > 0 && (
                        <span className="badge">{wishlist.length}</span>
                      )}
                    </button>
                  </Link>

                  {/* Cart Button with Count */}
                  <button
                    className="nav-btn icon-btn"
                    onClick={() => setIsCartOpen(true)}
                  >
                    🛒
                    {cartCount > 0 && (
                      <span className="badge">{cartCount}</span>
                    )}
                  </button>
                  {localStorage.getItem("isLoggedIn") ? (
                    <Link to="/profile">
                      <button className="nav-btn">
                        👤 <span className="profile-text">Profile</span>
                      </button>
                    </Link>
                  ) : (
                    <Link to="/login">
                      <button className="nav-btn">
                        🔑 <span className="signin-text">Sign In</span>
                      </button>
                    </Link>
                  )}
                  {!localStorage.getItem("isLoggedIn") && (
                    <Link to="/signup">
                      <button className="nav-btn">
                        ✨ <span className="signup-text">Sign Up</span>
                      </button>
                    </Link>
                  )}
                  <Link to="/admin">
                    <button className="nav-btn">📊 Admin</button>
                  </Link>
                  <button
                    className="nav-btn primary"
                    onClick={() =>
                      document
                        .getElementById("products")
                        ?.scrollIntoView({ behavior: "smooth" })
                    }
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </nav>

            <CartSidebar
              isCartOpen={isCartOpen}
              setIsCartOpen={setIsCartOpen}
              cartItems={cartItems}
              setCartItems={setCartItems}
            />

            {/* Hero Section */}
            <section className="hero">
              <div className="hero-content">
                <p className="hero-tag">Shop Smart, Live Smart</p>
                <h1 className="hero-title">
                  The Future of Tech
                  <br />
                  <span className="hero-highlight">Is Here.</span>
                </h1>
                <p className="hero-description">
                  Where innovation, quality, and customer satisfaction come
                  together to create the ultimate technology shopping
                  destination
                </p>
                <div className="hero-cta">
                  <a href="#products">
                    <button className="btn-primary">Explore Products</button>
                  </a>
                  <button className="btn-secondary">Learn More</button>
                </div>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Happy Customers</span>
                </div>
                <div className="stat">
                  <span className="stat-number">200+</span>
                  <span className="stat-label">Premium Products</span>
                </div>
                <div className="stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Customer Support</span>
                </div>
              </div>
            </section>
            {/* Cart Summary Bar - Shows only when cart has items */}
            {cartItems.length > 0 && (
              <div className="cart-summary">
                <div className="cart-summary-content">
                  <span>🛒 {cartCount} items in cart</span>
                  <span className="cart-total">
                    Total: ₹{cartTotal.toLocaleString("en-IN")}
                  </span>
                  <button
                    className="btn-checkout"
                    onClick={() => setIsCartOpen(true)}
                  >
                    View Cart →
                  </button>
                </div>
              </div>
            )}
            {/* Products Section */}
            <section className="products-section" id="products">
              <div className="section-header">
                <h2 className="section-title">Best Sellers</h2>
                <p className="section-subtitle">
                  Our most popular products loved by customers
                </p>
              </div>
              {/* Search and Filter Controls */}
              <div className="filter-controls">
                {/* Search Box */}
                <div className="search-box">
                  <span className="search-icon">🔍</span>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-input"
                  />
                  {searchTerm && (
                    <button
                      className="clear-btn"
                      onClick={() => setSearchTerm("")}
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Brand Filter Dropdown */}
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

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="filter-select"
                >
                  <option value="default">Sort By</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              {/* Results Count */}
              <p className="results-count">
                Showing {filteredProducts.length} of {products.length} products
                {searchTerm && ` for "${searchTerm}"`}
                {selectedBrand !== "All" && ` in ${selectedBrand}`}
              </p>
              <div className="product-grid">
                {filteredProducts.length > 0 ? (
                  filteredProducts
                    .slice(0, 8)
                    .map((product) => (
                      <ProductCard
                        key={product.id}
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        originalPrice={product.originalPrice}
                        discount={product.discount}
                        rating={product.rating}
                        image={product.image}
                        isBestSeller={product.isBestSeller}
                        isWishlisted={wishlist.includes(product.id)}
                        onAddToCart={() => addToCart(product)}
                        onToggleWishlist={() => toggleWishlist(product.id)}
                      />
                    ))
                ) : (
                  <div className="no-results">
                    <p>😕 No products found</p>
                  </div>
                )}
              </div>

              <div className="view-all-container">
                <Link to="/products">
                  <button className="btn-primary">View All Products</button>
                </Link>
              </div>
            </section>

            {/* Footer */}
            <AIChat />

            <footer className="footer" id="footer">
              <p>&copy; 2025 TechStore. All rights reserved.</p>
            </footer>
          </div>
        </>
      </div>
    </>
  );
}

export default Home;
