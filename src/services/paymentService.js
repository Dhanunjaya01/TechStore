import BASE_URL from "../api/api";

export async function savePayment(payment) {
  const response = await fetch(`${BASE_URL}/savePayment`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(payment),
  });

  return await response.json();
}
