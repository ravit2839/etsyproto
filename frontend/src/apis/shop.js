import api from ".";

export function getSingleShopDetail(shopId) {
  return api.get("/shop/single-shop/" + shopId);
}

export function isShopExists() {
  return api.get("/shop/is-shop-exists");
}

export function checkAvailablity(shop) {
  return api.post("/shop/check-availablity", shop);
}

export function createNewShop(shop) {
  return api.post("/shop", shop);
}

export function getShopDetail() {
  return api.get("/shop");
}

export function getShopItems(shopId) {
  return api.get("/shop/" + shopId);
}

export function updateShop(shop) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  setFieldsToFormData(fd, shop);

  return api.patch("/shop/" + shop.id, fd, config);
}

function setFieldsToFormData(fd, fields) {
  for (const key in fields) {
    fd.append(key, fields[key]);
  }
}
