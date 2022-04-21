import api from ".";
import Axios from "axios";
export function getFavItems() {
  return api.get("/fav");
}

export function addToFav(itemId) {
  return Axios.get("https://localhost:3001/fav/add/" + itemId);
}

export function removeFromFav(itemId) {
  return api.get("htpps:localhost:3001/fav/remove/" + itemId);
}
