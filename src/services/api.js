import axios from "axios";
import { getUserInfo } from "./auth";

export const apiBaseUrl = process.env.REACT_APP_API_URL
  ? process.env.REACT_APP_API_URL
  : "http://localhost:8080/v1";

const api = axios.create({
  baseURL: `${apiBaseUrl}/`,
});

api.interceptors.request.use(async (config) => {
  const access_token = getUserInfo().access;
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
  return config;
});

api.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (!axios.isCancel(error)) {
      if (error.response.status === 401) {
        const token = getUserInfo().access;
        if (token) {
          logout();          
          return;
        }
      }
    }

    return Promise.reject(error);
  }
);

export function logout(redirect = true) {
  localStorage.clear();
  if (redirect) {
    window.location.href = "/";
  }
}

export default api;
