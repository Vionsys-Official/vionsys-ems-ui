import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";

const token = localStorage.getItem("token");

export const createNotification = async (values) => {
  const { id: userid } = getUserIdRole();
  const response = await api.post(
    "/notification/create",
    { userid, ...values },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getNotifications = async () => {
  const response = await api.get("/notification/get");
  return response?.data;
};

export const getNotification = async (id) => {
  const response = await api.get(`/notification/find/${id}`);
  return response?.data;
};

export const deleteNotification = async (id) => {
  const response = await api.delete(`/notification/delete/${id}`);
  return response.data;
};

export const getNotificationToken = async (notificationToken) => {
  const { id: userId } = getUserIdRole();
  const response = await api.post(
    `notification/getNotificationToken/${notificationToken}`,
    { userId },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};
