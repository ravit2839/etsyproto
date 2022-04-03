import api from ".";

export function checkout(cartItems) {
  return api.post("/checkout", cartItems);
}
