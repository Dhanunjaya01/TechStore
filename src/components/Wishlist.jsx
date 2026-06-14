import React from "react";
import ProductCard from "./ProductCard";
import "./Wishlist.css";
import { Link, useNavigate } from "react-router-dom";

function Wishlist({ products, wishlist, toggleWishlist, addToCart }) {
  const navigate = useNavigate();
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <div className="wishlist-page">
      <Link to="/">
        <button className="back-btn">← Back to Store</button>
      </Link>

      <h1>❤️ My Wishlist ({wishlistProducts.length})</h1>

      {wishlistProducts.length === 0 ? (
        <div className="empty-wishlist">
          <h2>No Favorites Yet</h2>
          <p>Add products to your favorites ❤️</p>
        </div>
      ) : (
        <div className="product-grid">
          {wishlistProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isWishlisted={true}
              onToggleWishlist={() => toggleWishlist(product.id)}
              onAddToCart={() => {
                addToCart(product);
                navigate("/");
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
