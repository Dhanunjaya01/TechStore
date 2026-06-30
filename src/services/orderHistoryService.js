import BASE_URL from "../api/api";

export async function getOrders(userId) {
  const response = await fetch(`${BASE_URL}/orders?userId=${userId}`);

  return await response.json();
}
