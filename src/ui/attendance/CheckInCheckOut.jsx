import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Button, Card } from "antd";
import useGetAttendance from "../../features/attendance/useGetAttendance";
import useUpdateAttendance from "../../features/attendance/useUpdateAttendance";
import useCreateAttendance from "../../features/attendance/useCreateAttendance";
import getUserIdRole from "../../utils/getUserIdRole";
import { isToday } from "date-fns";

const CheckInCheckOut = () => {
  const { id } = getUserIdRole();
  const { data: employeesAttendance, isPending: tableLoading, refetch } = useGetAttendance({ uid: id });
  const { updateAttendance, isPending: updateLoading } = useUpdateAttendance();
  const { createAttendance, isPending: attendanceLoading } = useCreateAttendance();

  const checkIsToday = (employeesAttendance) => {
    const todayAttendance = employeesAttendance?.data?.attendance.filter((obj) =>
      isToday(obj?.date)
    );
    return todayAttendance;
  };

  const [startTime, setStartTime] = useState("00:00:00");
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!tableLoading) {
      const currentDateData = checkIsToday(employeesAttendance);
      if (currentDateData.length > 0) {
        if (!currentDateData[0]?.logoutTime) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      } else {
        setIsActive(false);
      }
    }
  }, [tableLoading, employeesAttendance]);

  useEffect(() => {
    let timer;
    if (!tableLoading && isActive) {
      timer = setInterval(() => {
        const currentDateData = checkIsToday(employeesAttendance);
        if (currentDateData.length > 0) {
          const timeDifference = Math.abs(
            new Date().getTime() - new Date(currentDateData[0]?.loginTime)?.getTime()
          );
          let hours = Math.floor(timeDifference / (1000 * 60 * 60));
          let minutes = Math.floor(
            (timeDifference % (1000 * 60 * 60)) / (1000 * 60)
          );
          let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);
          hours = hours < 10 ? "0" + hours : hours;
          minutes = minutes < 10 ? "0" + minutes : minutes;
          seconds = seconds < 10 ? "0" + seconds : seconds;
          setStartTime(`${hours}:${minutes}:${seconds}`);
        }
      }, 1000);
    } else {
      setStartTime("00:00:00");
    }

    return () => clearInterval(timer);
  }, [tableLoading, isActive, employeesAttendance]);

  const handleAttendanceLogin = () => {
    const time = new Date().toISOString();
    if (!checkIsToday(employeesAttendance)?.length) {
      createAttendance({ user: id, time, timeTag: "login" });
      setIsActive(true);
      refetch(); // Refetch after login to ensure data is updated
    } else {
      toast.error("You are already checked in");
    }
  };

  const handleAttendanceLogout = () => {
    const time = new Date().toISOString();
    if (checkIsToday(employeesAttendance)?.length) {
      updateAttendance({ user: id, time, timeTag: "logout" });
      setIsActive(false);
      refetch(); // Refetch after logout to ensure data is updated
    } else {
      toast.error("You are already checked out");
    }
  };

  return (
    <Card className="shadow-lg z-10 flex items-center justify-center dark:bg-gray-700">
      <div className="flex p-3 rounded-md border-2 border-blue-200 flex-col">
        <h2 className="text-lg text-center mb-2 dark:text-white">Your Attendance</h2>
        <h4 className="text-center text-4xl mb-2 dark:text-white">
          {!tableLoading ? startTime : "00:00:00"}
        </h4>
        <div className="border rounded-md mb-4 flex-1 text-[#888] p-2 flex flex-col gap-2 dark:text-white">
          <div className="flex justify-between">
            <span>Break Time:</span>
            <span>1 hour during 10AM - 7PM</span>
          </div>
          <div className="flex justify-between">
            <span>Working Hours:&nbsp;</span>
            <span>08H 00M (per day)</span>
          </div>
          <div className="flex justify-between">
            <span>Target Hours:&nbsp;</span>
            <span>09H 15M (per day)</span>
          </div>
        </div>
        <div className="flex gap-6 justify-center items-center">
          <Button
            type="button"
            className={`bg-green-400 text-white ${isActive
              ? "pointer-events-none opacity-50"
              : "hover:bg-white hover:text-green-400 hover:border-green-400"
              }`}
            onClick={handleAttendanceLogin}
            disabled={
              attendanceLoading || employeesAttendance?.data?.attendanceForDay?.loginTime
            }
          >
            Check In
          </Button>
          <Button
            type="button"
            className={`bg-red-500 text-white ${!isActive
              ? "pointer-events-none opacity-50"
              : "hover:bg-white hover:text-red-500 hover:border-red-500"
              }`}
            onClick={handleAttendanceLogout}
            disabled={
              updateLoading || employeesAttendance?.data?.attendanceForDay?.logoutTime
            }
          >
            Check Out
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default CheckInCheckOut;
