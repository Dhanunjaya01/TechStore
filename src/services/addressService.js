import BASE_URL from "../api/api";

export async function saveAddress(address) {
  const response = await fetch(`${BASE_URL}/saveAddress`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(address),
  });

  return await response.json();
}
