import api from ".";
import Axios from "axios";

export function checkout(cartItems) {
  return Axios.post("https://localhost:3001/checkout", cartItems);
}
