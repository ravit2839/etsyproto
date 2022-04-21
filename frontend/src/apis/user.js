import api from ".";
import Axios from "axios";

export function updateProfile(user) {
  const config = { headers: { "Content-Type": "multipart/form-data" } };
  let fd = new FormData();
  setFieldsToFormData(fd, user);

  return Axios.patch("https://localhost:3001/user/profile", fd, config);
}

function setFieldsToFormData(fd, fields) {
  for (const key in fields) {
    fd.append(key, fields[key]);
  }
}
