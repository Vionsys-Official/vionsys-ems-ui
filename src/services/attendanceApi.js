import { api } from "./authApi";

export const createAttendance = async ({ user, time, timeTag, note }) => {
  let payload =
    timeTag === "login" ? { loginTime: time } : { logoutTime: time };
  const response = await api.post("/attendance/create", {
    user,
    note,
    ...payload,
  });
  return response.data;
};

export const getAttendance = async (id) => {
  // console.log(id)
  const token = localStorage.getItem("token");
  const response = await api.get(`/attendance/find/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(response.data)
  return response.data;
};

export const getAllAttendance = async () => {
  const token = localStorage.getItem("token");
  const response = await api.get(`/attendance/get`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const updateAttendanceApi = async ({ time, timeTag, user }) => {
  let payload =
    timeTag === "login" ? { loginTime: time } : { logoutTime: time };

  const response = await api.put(`/attendance/update/${user}`, {
    user,
    ...payload,
  });
  return response.data;
};

export const getExcelData = async (Format_startDate, Format_endDate, email) => {
  const data = {
    Format_startDate,
    Format_endDate,
    email,
  };
  const response = await api.post("/attendance/Excel/getExcel", data);
  return response.data;
};

export const getExcelDataByID = async (
  Format_startDate,
  Format_endDate,
  email,
  userId
) => {
  const data = {
    Format_startDate,
    Format_endDate,
    email,
  };
  const response = await api.post(`/attendance/Excel/getExcel/${userId}`, data);
  return response.data;
};
