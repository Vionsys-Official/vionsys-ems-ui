import axios from "axios";

const token = localStorage.getItem("token");

const BASE_URL = "/api/v1/users/";

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// export const getLocalToken = () => {
//   if (!token) return;
//   const decodedToken =  jwtDecode(token);
//   const userId = decodedToken.id;
//   const role = decodedToken.role;
//   return {userId, role};
// };

export const login = async ({ email, password }) => {
  const response = await api.post("/login", { email, password });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};

export const signup = async (values) => {
  const response = await api.post("/signup", values, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const getCurrentUser = async (userId) => {
  const user = await api.get(`${userId}`);
  return user.data;
};

export const ForgotPassword = async (email) => {
  const responce = await api.post(
    "/forgotPassword",
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responce;
};

export const ResetPassword = async (password, passwordConfirm, token) => {
  const responce = await api.patch(
    `/resetPassword/${token}`,
    {
      password,
      passwordConfirm,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responce;
};

export const sendverifymail = async (email) => {
  const responce = await api.post(
    "/sendverifyMail",
    { email },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responce;
};

export const verifyMail = (token) => {
  const responce = api.post(`/verifyMail/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return responce;
};
