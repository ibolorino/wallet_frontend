import jwt_decode from "jwt-decode";

export const isExpired = (token) => {
  var decoded_token = jwt_decode(token);
  var now = Date.now();
  return now >= decoded_token.exp * 1000;
};

export const userIsAuthenticated = () => {
  const token = getUserInfo().access;
  if (token && !isExpired(token)) {
    return true;
  }
  return false;
};

export const userIsAuthenticatedFake = () => {
  const token = getUserInfo().access;
  if (token) {
    return true;
  }
  return false;
};

export function getUserInfo() {
  const user = localStorage.getItem("user");
  if (user) {
    return JSON.parse(user);
  } else {
    return {};
  }
}

export function setUserInfo(user = {}) {
  localStorage.setItem("user", JSON.stringify(user));
  return true;
}

export function getHospitalId() {
  return localStorage.getItem("hospitalId");
}

export function setHospitalId(id) {
  localStorage.setItem("hospitalId", id);
  return true;
}
