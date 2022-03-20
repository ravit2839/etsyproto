import api from ".";

export function getAllCategories(shopId) {
  return api.get("/item-category/" + shopId);
}

export function createNewCategory(category) {
  return api.post("/item-category", category);
}
