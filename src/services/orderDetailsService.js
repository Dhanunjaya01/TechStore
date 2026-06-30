import BASE_URL from "../api/api";

export async function getOrderDetails(orderId) {
  const response = await fetch(`${BASE_URL}/orderDetails?orderId=${orderId}`);

  return await response.json();
}
