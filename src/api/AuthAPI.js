import AdminAxiosClient from "./AdminClientAxios";

const AuthAPI = {
  login: ({ email, password }) => {
    const url = "/auth/login";
    const body = { email, password };
    return AdminAxiosClient.post(url, body);
  },

  register: ({ firstName, lastName, email, password }) => {
    const url = "/auth/signUp";
    const body = { firstName, lastName, email, password };
    return AdminAxiosClient.post(url, body);
  },

  refreshToken: () => {
    const url = "/auth/refreshToken";
    return AdminAxiosClient.post(url);
  },

  logout: () => {
    const url = "/auth/logout";
    return AdminAxiosClient.post(url);
  },

  getUser: () => {
    const url = "/auth/test";
    return AdminAxiosClient.get(url);
  },
};

export default AuthAPI;
