import api from ".";

export function getAllItems() {
  return api.get("/item");
}

export function getItem(id) {
  return api.get("/item/" + id);
}

<<<<<<< HEAD
export function updateItem(id, itemPayload) {
  return api.patch("/item/" + id, itemPayload);
}

export function deleteItem(id) {
  return api.delete("/item/" + id);
=======
export function updateItem(id, price) {
  return api.patch("/item/" + id, { price });
>>>>>>> origin/main
}

export function filterItems(filterOptions) {
  return api.post("/item/filter", filterOptions);
}

export function createNewItem(item) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  setFieldsToFormData(fd, item);

  return api.post("/item", fd, config);
}

function setFieldsToFormData(fd, fields) {
  // console.log("fields: ", fields);

  for (const key in fields) {
    // console.log("key: ", key);
    // console.log("__: ", fields[key]);
    if (Array.isArray(fields[key])) {
      fields[key].forEach((item) => {
        // console.log("item: ", item);
        fd.append(key, item);
      });
    } else {
      fd.append(key, fields[key]);
    }
  }
<<<<<<< HEAD
}
=======
}
>>>>>>> origin/main
