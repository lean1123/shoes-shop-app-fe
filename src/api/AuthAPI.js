import AdminAxiosClient from "./AdminClientAxios";

const AuthAPI = {
  login: ({ email, password }) => {
    const url = "/auth/login";
    const body = { email, password };
    return AdminAxiosClient.post(url, body, { withCredentials: true });
  },

  register: ({ firstName, lastName, email, password }) => {
    const url = "/auth/signUp";
    const body = { firstName, lastName, email, password };
    return AdminAxiosClient.post(url, body, { withCredentials: true });
  },

  refreshToken: () => {
    const url = "/auth/refreshToken";
    return AdminAxiosClient.post(url, {}, { withCredentials: true });
  },

  logout: () => {
    const url = "/auth/logout";
    return AdminAxiosClient.post(url, {}, { withCredentials: true });
  },

  getUser: () => {
    const url = "/auth/test";
    return AdminAxiosClient.get(url);
  },
};

export default AuthAPI;
