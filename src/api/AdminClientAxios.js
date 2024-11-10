import axios from "axios";
import AuthAPI from "./AuthAPI";
import { logout } from "@/reducers/AuthSlice";
import { store } from "@/lib/store";

const AdminAxiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const logOutCurrentUser = async () => {
  const action = logout();
  await store.dispatch(action);
  window.location.href = "/login";
};

const getToken = () => {
  const token = localStorage.getItem("accessToken");
  return token ? token : "";
};

AdminAxiosClient.interceptors.request.use(
  async (config) => {
    const publicEndpoints = [
      /auth\/login/,
      /auth\/signUp/,
      /auth\/refreshToken/,
    ];

    const isPublicEndpoint = publicEndpoints.some((pattern) =>
      pattern.test(config.url)
    );

    if (isPublicEndpoint) {
      if (config.headers.Authorization) {
        delete config.headers.Authorization;
      }
      return config;
    }

    const token = getToken();

    config.headers.Authorization = `Bearer ${token}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

AdminAxiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      let token = getToken();

      if (token) {
        try {
          const refreshedToken = await AuthAPI.refreshToken();

          console.log("refreshedToken in admin axios: ", refreshedToken);
          if (refreshedToken.status !== 200) {
            // throw new Error("No token returned");
            logOutCurrentUser();
            return Promise.reject(error);
          }
          token = await refreshedToken.data.token;
          localStorage.setItem("accessToken", token);
          originalRequest.headers.Authorization = `Bearer ${token}`;

          return AdminAxiosClient(originalRequest);
        } catch (error) {
          console.error("Error during token refresh request", error);
          logOutCurrentUser();
          return Promise.reject(error);
        }
      }
      logOutCurrentUser();

      return Promise.reject(error);
    }

    if (error.response) {
      console.error("Response error", error.response);
    } else if (error.request) {
      console.error("No response received", error.request);
    } else {
      console.error("Request setup error", error.message);
    }

    return Promise.reject(error);
  }
);

export default AdminAxiosClient;
