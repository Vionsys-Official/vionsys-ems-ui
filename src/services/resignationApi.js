import getUserIdRole from "../utils/getUserIdRole";
import { api } from "./authApi";
const token = localStorage.getItem("token");
const { id: userId } = getUserIdRole();
export const createResignation = async (data) => {
  const response = await api.post("/resignation/createResignation", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getResignationById = async (userId) => {
  const response = await api.get(`/resignation/findAllResignation/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getAllResignations = async () => {
  const response = await api.get(`/resignation/getAllResignation`,
    {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancelResignation = async ({ resignationId, reason }) => {
  try {
    const response = await api.post(
      "/resignation/cancle",
      {
        resignationId,
        userId,
        reason: reason, // Ensure this matches the backend field name
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error || "Failed to cancel resignation"
    );
  }
};

export const updateResignationStatus = async ({ resignationId, userId, status, note,adminId, noticePeriodDays,adminApprovedDate }) => {
  try {
    const response = await api.post(
      "/resignation/updateStatus",
      {
        resignationId,
        userId,
        status,
        note,
        adminId,
        noticePeriodDays,
        adminApprovedDate
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.error
    );
  }
};
