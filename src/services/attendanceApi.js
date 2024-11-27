import { api } from "./authApi";

const getDeviceName = () => {
  const userAgent = navigator.userAgent;

  // Match common device/OS names
  if (/Windows/.test(userAgent)) {
    return "Windows";
  }
  if (/Android/.test(userAgent)) {
    const match = userAgent.match(/Android\s([\d.]+)/);
    return match ? `Android ${match[1]}` : "Android";
  }
  if (/Macintosh/.test(userAgent)) {
    return "MacOS";
  }
  if (/iPhone/.test(userAgent)) {
    return "iPhone";
  }
  if (/iPad/.test(userAgent)) {
    return "iPad";
  }
  if (/Linux/.test(userAgent)) {
    return "Linux";
  }

  // Fallback for unknown devices
  return "Unknown Device";
};

export const createAttendance = async ({ user, time, timeTag, note }) => {
  const loginDevice = getDeviceName();
  let payload =
    timeTag === "login"
      ? { loginTime: time, loginDevice }
      : { logoutTime: time, logoutDevice };
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
  const deviceInfo = getDeviceName();
  let payload =
    timeTag === "login"
      ? { loginTime: time, loginDevice: deviceInfo }
      : { logoutTime: time, logoutDevice: deviceInfo };

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
