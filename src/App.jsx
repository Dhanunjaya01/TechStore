import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Wishlist from "./components/Wishlist";
import products from "./data";
import Profile from "./components/Profile";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  function toggleWishlist(productId) {
    if (wishlist.includes(productId)) {
      setWishlist(wishlist.filter((id) => id !== productId));
    } else {
      setWishlist([...wishlist, productId]);
    }
  }

  function addToCart(product) {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [...prevItems, { ...product, quantity: 1 }];
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

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />

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
    </Routes>
  );
}

export default App;
