import api from ".";

export function register(user) {
  return api.post("/auth/register", user);
}

export function login(user) {
  return api.post("/auth/login", user);
}
