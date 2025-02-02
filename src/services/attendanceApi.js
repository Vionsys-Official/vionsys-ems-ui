import { api } from "./authApi";

export const createAttendance = async ({
  user,
  shift,
  time,
  timeTag,
  note,
}) => {
  const loginDevice = navigator.userAgent;
  let payload =
    timeTag === "login"
      ? { loginTime: time, loginDevice }
      : { logoutTime: time, logoutDevice };
  const response = await api.post("/attendance/create", {
    user,
    note,
    shift,
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

export const updateAttendanceApi = async ({ time, shift, timeTag, user }) => {
  const deviceInfo = navigator.userAgent;
  let payload =
    timeTag === "login"
      ? { loginTime: time, loginDevice: deviceInfo }
      : { logoutTime: time, logoutDevice: deviceInfo };

  const response = await api.put(`/attendance/update/${user}`, {
    user,
    shift,
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

export const adminUpdateAttendance = async ({
  userId,
  date,
  loginTime,
  logoutTime,
}) => {
  // Define the payload with the required fields
  const payload = {
    date,
    loginTime,
    logoutTime,
  };

  // Get the token from localStorage for authorization
  const token = localStorage.getItem("token");

  // Send the PUT request to update the attendance
  const response = await api.put(
    `/attendance/admin/update/${userId}`,
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  // Return the updated attendance data
  return response.data;
};
