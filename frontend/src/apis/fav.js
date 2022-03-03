import api from ".";

export function getFavItems() {
  return api.get("/fav");
}

export function addToFav(itemId) {
  return api.get("/fav/add/" + itemId);
}

export function removeFromFav(itemId) {
  return api.get("/fav/remove/" + itemId);
}
