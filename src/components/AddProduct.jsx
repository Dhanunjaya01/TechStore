import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

function AddProduct() {
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: "",
    brand: "",
    price: "",
    stock: "",
    rating: "",
    image: "",
    description: "",
  });

  function handleChange(e) {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    const existingProducts =
      JSON.parse(localStorage.getItem("adminProducts")) || [];

    const newProduct = {
      id: Date.now(),
      ...product,
      isBestSeller: false,
    };

    existingProducts.push(newProduct);

    localStorage.setItem("adminProducts", JSON.stringify(existingProducts));

    alert("✅ Product Added Successfully");

    navigate("/manage-products");
  }
  return (
    <div className="add-product-page">
      <Link to="/manage-products">
        <button className="back-btn">← Back</button>
      </Link>

      <div className="form-card">
        <h1>Add Product</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="brand"
            placeholder="Brand"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="stock"
            placeholder="Stock"
            onChange={handleChange}
            required
          />

          <input
            type="number"
            step="0.1"
            name="rating"
            placeholder="Rating"
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL"
            onChange={handleChange}
          />

          <textarea
            name="description"
            placeholder="Product Description"
            rows="5"
            onChange={handleChange}
          />

          <button type="submit" className="save-btn">
            Save Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
