import { useState } from "react";
import { Link } from "react-router-dom";
import defaultProducts from "../data";
import "./ManageProducts.css";

function ManageProducts() {
  const [search, setSearch] = useState("");

  const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

  const products = [...defaultProducts, ...savedProducts];

  function handleDelete(id) {
    const confirmDelete = window.confirm("Delete this product?");

    if (!confirmDelete) return;

    const savedProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const updatedProducts = savedProducts.filter((item) => item.id !== id);

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    alert("✅ Product Deleted Successfully");

    window.location.reload();
  }

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.brand.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="manage-products-page">
      <div className="top-bar">
        <Link to="/admin">
          <button className="back-btn">← Dashboard</button>
        </Link>

        <h1>Manage Products</h1>

        <Link to="/add-product">
          <button className="add-product-btn">+ Add Product</button>
        </Link>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search Product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Desktop Table */}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Product</th>
              <th>Brand</th>
              <th>Price</th>
              <th>Rating</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-img"
                  />
                </td>

                <td>{product.name}</td>

                <td>{product.brand}</td>

                <td>₹{product.price.toLocaleString("en-IN")}</td>

                <td>⭐ {product.rating}</td>

                <td>
                  <span className="active-badge">Active</span>
                </td>

                <td className="action-buttons">
                  <Link to={`/edit-product/${product.id}`}>
                    <button className="desktop-edit-btn">✏️ Edit</button>
                  </Link>

                  <button
                    className="desktop-delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}

      <div className="mobile-products">
        {filteredProducts.map((product) => (
          <div className="mobile-product-card" key={product.id}>
            <img src={product.image} alt={product.name} />

            <h3>{product.name}</h3>

            <p>
              <strong>Brand:</strong> {product.brand}
            </p>

            <p>
              <strong>Price:</strong> ₹{product.price.toLocaleString("en-IN")}
            </p>

            <p>
              <strong>Rating:</strong> ⭐ {product.rating}
            </p>

            <span className="active-badge">Active</span>

            <div className="mobile-actions">
              <Link to={`/edit-product/${product.id}`}>
                <button className="edit-btn">✏️ Edit</button>
              </Link>

              <button
                className="delete-btn"
                onClick={() => handleDelete(product.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ManageProducts;
