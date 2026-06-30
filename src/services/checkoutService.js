import BASE_URL from "../api/api";

export async function checkout(checkoutData) {
  const response = await fetch(`${BASE_URL}/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(checkoutData),
  });

  return await response.json();
}
