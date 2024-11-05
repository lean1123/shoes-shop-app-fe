import axios from "axios";

const AdminAxiosClient = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

const getToken = () => {
  const token = localStorage.getItem("jwt");

  return token ? token : "";
};

AdminAxiosClient.interceptors.request.use(
  async (config) => {
    const publicEndpoints = [/auth\/login/, /auth\/signup/, /auth\/refresh/];

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
    // const originalRequest = error.config;

    // if (error.response.status === 401 && !originalRequest._retry) {
    //   originalRequest._retry = true;
    //   let token = getToken();

    //   if (token) {
    //     try {
    //       const refreshedToken = await UserService.refreshToken(token);
    //       console.log("refreshedToken in admin axios: ", refreshedToken);
    //       if (refreshedToken.length === 0) {
    //         // throw new Error("No token returned");
    //         return Promise.reject(error);
    //       }
    //       token = refreshedToken;
    //       localStorage.setItem("jwt", token);
    //       originalRequest.headers.Authorization = `Bearer ${token}`;

    //       return AdminAxiosClient(originalRequest);
    //     } catch (error) {
    //       console.error("Error during token refresh request", error);

    //       return Promise.reject(error);
    //     }
    //   }
    //   return Promise.reject(error);
    // }

    // if (error.response) {
    //   console.error("Response error", error.response);
    // } else if (error.request) {
    //   console.error("No response received", error.request);
    // } else {
    //   console.error("Request setup error", error.message);
    // }

    return Promise.reject(error);
  }
);

export default AdminAxiosClient;
