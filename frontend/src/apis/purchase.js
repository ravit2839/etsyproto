import api from ".";
import Axios from "axios";
export function getAllPurchases() {
  return Axios.get("https://localhost:3001/purchase");
}
