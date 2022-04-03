import api from ".";

export function updateProfile(user) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  setFieldsToFormData(fd, user);

  return api.patch("/user/profile", fd, config);
}

function setFieldsToFormData(fd, fields) {
  for (const key in fields) {
    fd.append(key, fields[key]);
  }
}
