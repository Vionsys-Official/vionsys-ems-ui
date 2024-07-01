import { api } from "./authApi";
export const createKit = async (values) => {
  const response = await api.post('/welcomeKit/create', values);
  return response.data;
}

export const getKitDetails = async (userId) => {
  const response = await api.get(`welcomeKit/${userId}`);
  return response.data;
};

export const updateWelcomeKit = async (kitId) => {
  const response = await api.patch(`welcomeKit/${kitId}`);
  return response.data;
}