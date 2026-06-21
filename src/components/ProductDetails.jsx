import { useParams, Link, useNavigate } from "react-router-dom";
import products from "../data";
import "./ProductDetails.css";

function ProductDetails({
  addToCart,
  wishlist,
  toggleWishlist,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(
    (p) => p.id === Number(id)
  );

  if (!product) {
    return (
      <div className="product-details-page">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const isWishlisted =
    wishlist.includes(product.id);

  const relatedProducts = products
    .filter(
      (p) =>
        p.brand === product.brand &&
        p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="product-details-page">

      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="product-container">

        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="main-image"
          />
        </div>

        <div className="product-info">

          {product.isBestSeller && (
            <span className="best-seller">
              Best Seller
            </span>
          )}

          <h1>{product.name}</h1>

          <p className="brand">
            Brand: {product.brand}
          </p>

          <div className="rating">
            ⭐ {product.rating}/5
          </div>

          <div className="price-box">

            <span className="price">
              ₹
              {product.price.toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="old-price">
              ₹
              {product.originalPrice?.toLocaleString(
                "en-IN"
              )}
            </span>

            <span className="discount">
              {product.discount}
            </span>

          </div>

          <div className="stock">
            ✅ In Stock
          </div>

          <div className="delivery">
            🚚 Free Delivery
          </div>

          <div className="warranty">
            🛡️ 1 Year Warranty
          </div>

          <div className="description">
            <h3>Description</h3>

            <p>
              Premium quality {product.brand}
              product available at TechStore.
              Designed for performance,
              durability and everyday use.
            </p>
          </div>

          <div className="features">

            <h3>Features</h3>

            <ul>
              <li>✔ Premium Build Quality</li>
              <li>✔ Fast Performance</li>
              <li>✔ Latest Technology</li>
              <li>✔ Easy Returns</li>
              <li>✔ Secure Packaging</li>
            </ul>

          </div>

          <div className="action-buttons">

            <button
              className="cart-btn"
              onClick={() =>
                addToCart(product)
              }
            >
              Add To Cart
            </button>

            <button
              className="wishlist-btn"
              onClick={() =>
                toggleWishlist(product.id)
              }
            >
              {isWishlisted
                ? "❤️ Wishlisted"
                : "🤍 Wishlist"}
            </button>

            <Link to="/checkout">
              <button className="buy-btn">
                Buy Now
              </button>
            </Link>

          </div>

        </div>
      </div>

      <div className="related-section">

        <h2>Related Products</h2>

        <div className="related-grid">

          {relatedProducts.map((item) => (
            <Link
              key={item.id}
              to={`/product/${item.id}`}
              className="related-card"
            >
              <img
                src={item.image}
                alt={item.name}
              />

              <h4>{item.name}</h4>

              <p>
                ₹
                {item.price.toLocaleString(
                  "en-IN"
                )}
              </p>
            </Link>
          ))}

        </div>
      </div>

    </div>
  );
}

export default ProductDetails;