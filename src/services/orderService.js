import BASE_URL from "../api/api";

export async function placeOrder(order) {
  const response = await fetch(`${BASE_URL}/placeOrder`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(order),
  });

  return await response.json();
}
