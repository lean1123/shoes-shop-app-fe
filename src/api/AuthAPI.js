import AdminAxiosClient from "./AdminClientAxios";

const AuthAPI = {
  login: (email, password) => {
    const url = "/auth/login";
    const body = { email, password };
    return AdminAxiosClient.post(url, body);
  },
};

export default AuthAPI;
