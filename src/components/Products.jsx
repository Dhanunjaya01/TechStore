import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCart, updateCart, deleteCart } from "../services/cartService";
import { getAllProducts } from "../services/productService";
import ProductCard from "./ProductCard";
import CartSidebar from "./CartSidebar";
import "./Products.css";

function Products({
  wishlist,
  toggleWishlist,
  addToCart,
  cartItems,
  setCartItems,
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await getAllProducts();
        console.log("Products from API:", data);
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
        console.log("Formatted Products:", formattedProducts);
        setProducts(formattedProducts);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);
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

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Loading Products...</h2>;
  }

  return (
    <>
      <CartSidebar
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />

      <div className="products-page">
        {/* HEADER */}

        <div className="products-header">
          <Link to="/">
            <button className="back-btn">← Back</button>
          </Link>

          <h1 className="products-title">All Products</h1>

          <button className="cart-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Cart (
            {cartItems.reduce((total, item) => total + item.quantity, 0)})
          </button>
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
