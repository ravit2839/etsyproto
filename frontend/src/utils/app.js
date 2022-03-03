export const BASE_URL = "http://localhost:8000/";
export const APP_BASE_URL = "http://localhost:3000";

export function getImageURL(imageURL) {
  if (imageURL) {
    return BASE_URL + imageURL;
  }

  return "";
}
