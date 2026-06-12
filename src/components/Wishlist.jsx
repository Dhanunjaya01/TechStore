import { Link } from "react-router-dom";

function Wishlist({ products, wishlist, toggleWishlist }) {
  const wishlistProducts = products.filter((product) =>
    wishlist.includes(product.id),
  );

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>❤️ My Wishlist</h1>

        <Link to="/">
          <button className="back-btn">🏠 Home</button>
        </Link>
      </div>

      <h3>Saved Products: {wishlistProducts.length}</h3>

      {wishlistProducts.length === 0 ? (
        <div className="empty-wishlist">
          <h2>No wishlist items found</h2>
        </div>
      ) : (
        <div className="wishlist-grid">
          {wishlistProducts.map((product) => (
            <div key={product.id} className="wishlist-card">
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>₹{product.price.toLocaleString("en-IN")}</p>

              <button
                className="remove-btn"
                onClick={() => toggleWishlist(product.id)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
