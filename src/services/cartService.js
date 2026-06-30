import BASE_URL from "../api/api";

// Add Product To Cart
export async function addToCart(cart) {
  const response = await fetch(`${BASE_URL}/addToCart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  });

  return await response.json();
}

// Get User Cart
export async function getCart(userId) {
  const response = await fetch(`${BASE_URL}/cart?userId=${userId}`);

  return await response.json();
}

// Update Quantity
export async function updateCart(cartId, quantity) {
  const response = await fetch(`${BASE_URL}/updateCart`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cartId,
      quantity,
    }),
  });

  return await response.json();
}

// Delete Cart Item
export async function deleteCart(cartId) {
  const response = await fetch(`${BASE_URL}/deleteCart?cartId=${cartId}`, {
    method: "DELETE",
  });

  return await response.json();
}
