import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

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

import products from "./data";

function App() {
  // WISHLIST PERSISTENCE
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    return savedWishlist ? JSON.parse(savedWishlist) : [];
  });

  // CART PERSISTENCE
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // SAVE WISHLIST
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

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
  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
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
      <Route path="/payment" element={<Payment cartItems={cartItems} />} />

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
      <Route path="/track-order" element={<TrackOrder />} />
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
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/manage-products" element={<ManageProducts />} />
      <Route path="/orders" element={<MyOrders />} />
      <Route
        path="/wishlist"
        element={
          <Wishlist
            products={products}
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
