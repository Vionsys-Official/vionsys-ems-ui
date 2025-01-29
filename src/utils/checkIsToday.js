import { isToday, isYesterday } from "date-fns";

const checkIsToday = (employeesAttendance) => {
  const currentDate = new Date();
  const currentHour = currentDate.getHours();

  if (currentHour >= 0 && currentHour < 6) {
    const todayAttendance = employeesAttendance?.data?.attendance.filter(
      (obj) => isYesterday(obj?.date)
    );
    return todayAttendance;
  }

  if (currentHour >= 6 && currentHour < 24) {
    const todayAttendance = employeesAttendance?.data?.attendance.filter(
      (obj) => isToday(obj?.date)
    );
    return todayAttendance;
  }
};

export default checkIsToday;
