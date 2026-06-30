import BASE_URL from "../api/api";

export async function getAllProducts() {
  const response = await fetch(`${BASE_URL}/products`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  return await response.json();
}

export async function getProductById(id) {
  const response = await fetch(`${BASE_URL}/product?id=${id}`);

  if (!response.ok) {
    throw new Error("Product not found");
  }

  return await response.json();
}

export async function searchProducts(keyword) {
  const response = await fetch(`${BASE_URL}/searchProducts?keyword=${keyword}`);

  return await response.json();
}
