import { api } from "./authApi";

export const getWorkHistory = async (userId) => {
  const response = await api.get(`/workHistory/${userId}`);
  return response?.data;
};

export const addWorkHistory = async (data) => {
  const responce = await api.post("/workHistory", { ...data });
  return responce?.data;
};

export const deleteWorkHistory = async (id) => {
  const responce = await api.delete(`/workHistory/${id}`);
  return responce?.data;
};
