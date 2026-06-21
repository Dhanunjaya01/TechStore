import { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import "./AddProduct.css";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const savedProducts = JSON.parse(localStorage.getItem("adminProducts")) || [];

  const existingProduct = savedProducts.find((item) => item.id === Number(id));

  const [product, setProduct] = useState(
    existingProduct || {
      name: "",
      brand: "",
      price: "",
      stock: "",
      rating: "",
      image: "",
      description: "",
    },
  );

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const updatedProducts = savedProducts.map((item) =>
      item.id === Number(id) ? product : item,
    );

    localStorage.setItem("adminProducts", JSON.stringify(updatedProducts));

    alert("✅ Product Updated Successfully");

    navigate("/manage-products");
  }

  return (
    <div className="add-product-page">
      <Link to="/manage-products">
        <button className="back-btn">← Back</button>
      </Link>

      <div className="form-card">
        <h1>Edit Product</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            placeholder="Product Name"
            required
          />

          <input
            type="text"
            name="brand"
            value={product.brand}
            onChange={handleChange}
            placeholder="Brand"
            required
          />

          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            placeholder="Price"
            required
          />

          <input
            type="number"
            name="stock"
            value={product.stock}
            onChange={handleChange}
            placeholder="Stock"
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            value={product.rating}
            onChange={handleChange}
            placeholder="Rating"
          />

          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleChange}
            placeholder="Image URL"
          />

          <textarea
            rows="5"
            name="description"
            value={product.description}
            onChange={handleChange}
            placeholder="Description"
          />

          <button type="submit" className="save-btn">
            Update Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProduct;
