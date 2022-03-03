import api from ".";

export function getAllItems() {
  return api.get("/item");
}

export function getItem(id) {
  return api.get("/item/" + id);
}

export function createNewItem(item) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  setFieldsToFormData(fd, item);

  return api.post("/item", fd, config);
}

function setFieldsToFormData(fd, fields) {
  for (const key in fields) {
    if (fields[key] === Array) {
      for (const item in fields[key]) {
        fd.append(key, item);
      }
    } else {
      fd.append(key, fields[key]);
    }
  }
}
