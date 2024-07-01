import { api } from "./authApi";
const token = localStorage.getItem("token");

export const createLeaveRequest = async (data) => {
  const response = await api.post("/leaves/create", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserLeaveHistory = async (userId) => {
  const response = await api.get(`/leaves/leaveHistory/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getleavehistory = async () => {
  const response = await api.get("/leaves/leaveHistory", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const cancleleave = async (user, leaveId, cancleReason) => {
  const response = await api.post(
    `/leaves/cancel/${leaveId}`,
    { user, cancleReason },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const leaveapproved = async (leaveId, userId, note) => {
  const responce = await api.post(
    "/leaves/Approved",
    {
      leaveId,
      userId,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responce.data;
};

export const leaverejected = async (leaveId, userId, note) => {
  const responce = await api.post(
    "/leaves/Rejected",
    {
      leaveId,
      userId,
      note,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return responce.data;
};
