import api from ".";

export function getAllPurchases() {
  return api.get("/purchase");
}
