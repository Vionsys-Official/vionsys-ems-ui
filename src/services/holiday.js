import { api } from "./authApi";

export const getHoliday = async (year) => {
  const response = await api.get(`/holidays/${year}`);
  return response.data;
};

export const deleteHoliday = async (id) => {
  const response = await api.delete(`/holidays/${id}`);
  return response.data;
};

export const createHoliday = async (data) => {
  const response = await api.post(`/holidays`, { ...data });
  return response.data;
};
