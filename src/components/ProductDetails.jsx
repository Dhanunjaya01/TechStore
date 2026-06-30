import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProductById, getAllProducts } from "../services/productService";
import "./ProductDetails.css";

function ProductDetails({ addToCart, wishlist, toggleWishlist }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      try {
        // Load selected product
        const productData = await getProductById(id);

        const formattedProduct = {
          id: productData.productId,
          name: productData.productName,
          brand: productData.brand,
          category: productData.category,
          description: productData.description,
          price: productData.price,
          discount: productData.discountPercent,
          rating: productData.rating,
          stock: productData.stock,
          image: productData.imageUrl,
        };

        setProduct(formattedProduct);

        // Load related products
        const allProducts = await getAllProducts();

        const formattedProducts = allProducts.map((p) => ({
          id: p.productId,
          name: p.productName,
          brand: p.brand,
          category: p.category,
          description: p.description,
          price: p.price,
          discount: p.discountPercent,
          rating: p.rating,
          stock: p.stock,
          image: p.imageUrl,
        }));

        const related = formattedProducts
          .filter(
            (p) =>
              p.brand === formattedProduct.brand &&
              p.id !== formattedProduct.id,
          )
          .slice(0, 4);

        setRelatedProducts(related);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);
  if (loading) {
    return (
      <div className="product-details-page">
        <h2>Loading Product...</h2>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="product-details-page">
        <h2>Product Not Found</h2>
      </div>
    );
  }

  const isWishlisted = wishlist.includes(product.id);

  return (
    <div className="product-details-page">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="product-container">
        <div className="product-image-section">
          <img src={product.image} alt={product.name} className="main-image" />
        </div>

        <div className="product-info">
          {product.isBestSeller && (
            <span className="best-seller">Best Seller</span>
          )}

          <h1>{product.name}</h1>

          <p className="brand">Brand: {product.brand}</p>

          <div className="rating">⭐ {product.rating}/5</div>

          <div className="price-box">
            <span className="price">
              ₹{product.price.toLocaleString("en-IN")}
            </span>

            <span className="old-price">
              {(
                product.price +
                (product.price * product.discount) / 100
              ).toLocaleString("en-IN")}
            </span>

            <span className="discount">{product.discount}</span>
          </div>

          <div className="stock">
            {product.stock > 0
              ? `✅ ${product.stock} Items Available`
              : "❌ Out of Stock"}
          </div>

          <div className="delivery">🚚 Free Delivery</div>

          <div className="warranty">🛡️ 1 Year Warranty</div>

          <div className="description">
            <h3>Description</h3>

            <p>{product.description}</p>
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
            <button className="cart-btn" onClick={() => addToCart(product)}>
              Add To Cart
            </button>

            <button
              className="wishlist-btn"
              onClick={() => toggleWishlist(product.id)}
            >
              {isWishlisted ? "❤️ Wishlisted" : "🤍 Wishlist"}
            </button>

            <Link to="/checkout">
              <button className="buy-btn">Buy Now</button>
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
              <img src={item.image} alt={item.name} />

              <h4>{item.name}</h4>

              <p>₹{item.price.toLocaleString("en-IN")}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
