import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getCart,
  addToCart as addToCartAPI,
  updateCart,
  deleteCart,
} from "./services/cartService";

import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wishlist from "./components/Wishlist";
import Profile from "./components/Profile";
import Products from "./components/Products";
import Checkout from "./components/Checkout";
import Payment from "./components/Payment";
import Success from "./components/Success";
import MyOrders from "./components/MyOrders";
import TrackOrder from "./components/TrackOrder";
import ProductDetails from "./components/ProductDetails";
import AdminDashboard from "./components/AdminDashboard";
import ManageProducts from "./components/ManageProducts";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import ManageOrders from "./components/ManageOrders";
import ManageUsers from "./components/ManageUsers";
import AdminProtected from "./components/AdminProtected";
import AdminLogin from "./components/AdminLogin";

function App() {
  // WISHLIST PERSISTENCE
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // CART PERSISTENCE
  const [cartItems, setCartItems] = useState([]);
  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);
  useEffect(() => {
    async function loadCart() {
      const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

      if (!loggedInUser) return;

      try {
        const cart = await getCart(loggedInUser.userId);

        const formattedCart = cart.map((item) => ({
          cartId: item.cartId,
          id: item.productId,
          name: item.productName,
          brand: item.brand,
          price: item.price,
          image: item.imageUrl,
          quantity: item.quantity,
        }));

        setCartItems(formattedCart);
      } catch (error) {
        console.error(error);
      }
    }

    loadCart();
  }, []);

  // SAVE CART
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // TOGGLE WISHLIST
  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  }

  // ADD TO CART
  async function addToCart(product) {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
      alert("Please login first");

      return;
    }

    try {
      await addToCartAPI({
        userId: loggedInUser.userId,

        productId: product.id,

        quantity: 1,
      });

      const cart = await getCart(loggedInUser.userId);

      const formattedCart = cart.map((item) => ({
        cartId: item.cartId,
        id: item.productId,
        name: item.productName,
        brand: item.brand,
        price: item.price,
        image: item.imageUrl,
        quantity: item.quantity,
      }));

      setCartItems(formattedCart);

      alert("Product Added To Cart");
    } catch (error) {
      console.error(error);

      alert("Unable To Add Product");
    }
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            cartItems={cartItems}
            addToCart={addToCart}
            setCartItems={setCartItems}
          />
        }
      />
      <Route
        path="/payment"
        element={<Payment cartItems={cartItems} setCartItems={setCartItems} />}
      />

      <Route path="/success" element={<Success />} />
      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/admin"
        element={
          <AdminProtected>
            <AdminDashboard />
          </AdminProtected>
        }
      />
      <Route
        path="/manage-products"
        element={
          <AdminProtected>
            <ManageProducts />
          </AdminProtected>
        }
      />

      <Route
        path="/manage-orders"
        element={
          <AdminProtected>
            <ManageOrders />
          </AdminProtected>
        }
      />

      <Route
        path="/manage-users"
        element={
          <AdminProtected>
            <ManageUsers />
          </AdminProtected>
        }
      />
      <Route path="/manage-users" element={<ManageUsers />} />
      <Route path="/manage-orders" element={<ManageOrders />} />
      <Route path="/edit-product/:id" element={<EditProduct />} />
      <Route path="/admin" element={<AdminDashboard />} />
      <Route
        path="/product/:id"
        element={
          <ProductDetails
            addToCart={addToCart}
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
          />
        }
      />
      <Route path="/add-product" element={<AddProduct />} />
      <Route path="/track-order/:orderId" element={<TrackOrder />} />
      <Route
        path="/products"
        element={
          <Products
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
            cartItems={cartItems}
            setCartItems={setCartItems}
          />
        }
      />
      <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route
        path="/wishlist"
        element={
          <Wishlist
            wishlist={wishlist}
            toggleWishlist={toggleWishlist}
            addToCart={addToCart}
          />
        }
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  );
}

export default App;
