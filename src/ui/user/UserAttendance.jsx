import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useGetAttendance from "../../features/attendance/useGetAttendance";
import useUpdateAttendanceAdmin from "../../features/attendance/useUpdateAttendanceAdmin"; // Import the hook
import "../../utils/css/attendance.css";
import getholidayList from "../../features/holiday/useGetHolidays";
import getUserIdRole from "../../utils/getUserIdRole";
import { Modal, Button, TimePicker, Form } from "antd";
import { EditOutlined } from "@ant-design/icons";
import getDeviceNameFromUserAgent from "../../utils/getDeviceNameFromUserAgent";

const localizer = momentLocalizer(moment);

const isWeeklyOff = (date) => {
  const dayOfWeek = moment(date).day();
  const dayOfMonth = moment(date).date();
  return (
    dayOfWeek === 0 ||
    (dayOfWeek === 6 &&
      ((dayOfMonth > 7 && dayOfMonth <= 14) ||
        (dayOfMonth > 21 && dayOfMonth <= 28)))
  );
};

const isAlternateSaturdayOff = (date) => {
  const dayOfMonth = moment(date).date();
  return dayOfMonth / 14 === 0; // Alternate Saturdays
};

const isAlternateSundayOff = (date) => {
  const dayOfWeek = moment(date).day();
  return dayOfWeek === 0 && moment(date).date() % 14 !== 0; // Alternate Sundays
};

const UserAttendance = ({ user }) => {
  const { role } = getUserIdRole();
  const { updateAttendanceAdmin, isPending } = useUpdateAttendanceAdmin(); // Use the hook

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [form] = Form.useForm();

  const {
    data: employeesData,
    isPending: attendanceLoading,
    refetch,
  } = useGetAttendance({
    uid: user?.uid || null,
    year: selectedYear,
    month: selectedMonth,
  });

  const userAttendance = employeesData?.data?.attendance;

  const { data: holidayList, isPending: holidayLoading } =
    getholidayList(selectedYear);

  const fixedHolidayList = holidayList?.fixedHolidays || [];
  const [events, setEvents] = useState([]);

  useEffect(() => {
    if (userAttendance && fixedHolidayList) {
      const processedEvents = generateEvents(userAttendance, fixedHolidayList);
      if (JSON.stringify(events) !== JSON.stringify(processedEvents)) {
        setEvents(processedEvents);
      }
    }
  }, [userAttendance, fixedHolidayList, selectedYear, selectedMonth]);

  const generateEvents = (attendanceData, fixedHolidayList) => {
    const processedEvents = [];
    const today = new Date();

    const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1);
    const lastDayOfMonth = new Date(selectedYear, selectedMonth + 1, 0);

    for (
      let date = new Date(firstDayOfMonth);
      date <= lastDayOfMonth;
      date.setDate(date.getDate() + 1)
    ) {
      const dateString = moment(date).format("YYYY-MM-DD");

      // Check for attendance on the current date
      const attendanceEntry = attendanceData?.find(
        (entry) => moment(entry.date).format("YYYY-MM-DD") === dateString
      );

      // Check if it's a holiday
      const holiday = fixedHolidayList.find(
        (entry) => moment(entry.date).format("YYYY-MM-DD") === dateString
      );

      // Check for weekly off
      const isWO =
        isWeeklyOff(date) ||
        isAlternateSaturdayOff(date) ||
        isAlternateSundayOff(date);

      if (attendanceEntry) {
        const loginTime = new Date(attendanceEntry?.loginTime);
        const loginDevice = attendanceEntry?.loginDevice;
        const logoutDevice = attendanceEntry?.logoutDevice;
        const logoutTime = attendanceEntry?.logoutTime
          ? new Date(attendanceEntry.logoutTime)
          : null;

        // Calculate work time duration
        const duration = logoutTime
          ? moment.duration(logoutTime - loginTime)
          : null;
        const workTime = duration
          ? `${duration.hours()} hrs : ${duration.minutes()} mins`
          : "NA";

        let title = "P";
        let classNames = "present";

        if (holiday) {
          title = "HO/P";
          classNames = "presentHoliday";
        } else if (isWO) {
          title = "WO/P";
          classNames = "presentWeeklyOff";
        }

        // Push attendance event
        processedEvents.push({
          title,
          loginDevice: loginDevice,
          logoutDevice: logoutDevice,
          work: workTime,
          desc: `${moment(loginTime).format("hh:mm A")} - ${
            logoutTime ? moment(logoutTime).format("hh:mm A") : "NA"
          }`,
          start: new Date(dateString),
          end: new Date(dateString),
          type: "present",
          classNames,
          attendanceEntry,
        });
      } else if (holiday) {
        // If it's a holiday without attendance
        processedEvents.push({
          title: "HO",
          desc: holiday.holidayName,
          start: new Date(dateString),
          end: new Date(dateString),
          type: "holiday",
          classNames: "holiday",
        });
      } else if (isWO) {
        // If it's a weekly off without attendance
        processedEvents.push({
          title: "WO",
          start: new Date(dateString),
          end: new Date(dateString),
          type: "weeklyOff",
          classNames: "weeklyOff",
        });
      } else if (date <= today) {
        // If the employee is absent
        processedEvents.push({
          title: "A",
          start: new Date(dateString),
          end: new Date(dateString),
          type: "absent",
          classNames: "absent",
        });
      }
    }

    return processedEvents;
  };

  const eventStyleGetter = (event) => {
    // Customize style for a particular event
    let style = {};
    if (event.title === "WO") {
      style.backgroundColor = "#e53935";
      style.color = "#fff";
    } else if (event.title === "A") {
      style.backgroundColor = "#e53935";
      style.color = "#fff";
    } else if (event.title === "P") {
      style.backgroundColor = "#1df52bc9";
      style.color = "#fff";
    } else if (event.title === "HO") {
      style.backgroundColor = "#7498d0"; // Blue color for holidays
      style.color = "#fff";
    } else if (event.title == "HO/P") {
      style.backgroundColor = "#0a42ab";
      style.color = "#fff";
    } else if (event.title == "WO/P") {
      style.backgroundColor = "#0a42ab";
      style.color = "#fff";
    }
    return { style };
  };

  // Custom Event component to include login and logout times
  const CustomEvent = ({ event }) => (
    <div className="relative">
      <strong className="text-sm">{event.title}</strong>
      {event.desc && (
        <div className="text-[13px] font-semibold">{event.desc}</div>
      )}
      <span>
        {event.work && (
          <div className="text-[10px] font-semibold">{event.work}</div>
        )}
      </span>
      <div>
        {role === "admin" && event.loginDevice && (
          <p className="text-[12px]">
            Login: {getDeviceNameFromUserAgent(event.loginDevice)}
          </p>
        )}
      </div>
      <div>
        {role === "admin" && event.logoutDevice && (
          <p className="text-[12px]">
            Logout: {getDeviceNameFromUserAgent(event.logoutDevice)}
          </p>
        )}
      </div>
      {role === "admin" && (
        <Button
          size="small"
          icon={<EditOutlined style={{ fontSize: "12px" }} />}
          onClick={() => openEditModal(event)}
          className="absolute top-0 right-0 mt-1 mr-1"
          style={{ padding: "0", fontSize: "12px" }}
        />
      )}
    </div>
  );

  const openEditModal = (event) => {
    // Set selected event data
    setSelectedEvent(event);

    // Check and set form values based on event data
    form.setFieldsValue({
      loginTime: event.attendanceEntry?.loginTime
        ? moment(event.attendanceEntry.loginTime)
        : undefined, // Leave undefined if loginTime is not available
      logoutTime: event.attendanceEntry?.logoutTime
        ? moment(event.attendanceEntry.logoutTime)
        : undefined, // Leave undefined if logoutTime is not available
    });

    // Show the modal
    setIsModalVisible(true);
  };

  const handleOk = () => {
    const values = form.getFieldsValue();

    // Ensure loginTime and logoutTime are properly formatted
    const loginTime = values.loginTime
      ? moment(selectedEvent.start)
          .set({
            hour: values.loginTime.hour(),
            minute: values.loginTime.minute(),
          })
          .toISOString()
      : null;

    const logoutTime = values.logoutTime
      ? moment(selectedEvent.start)
          .set({
            hour: values.logoutTime.hour(),
            minute: values.logoutTime.minute(),
          })
          .toISOString()
      : null;

    const userId = user.uid;
    const attendanceData = {
      userId,
      date: selectedEvent.start.toISOString(), // Keep the original date
      loginTime: loginTime || null,
      logoutTime: logoutTime || null,
    };

    // Call mutation to update attendance
    updateAttendanceAdmin(attendanceData, {
      onSuccess: () => {
        // Refetch attendance data on success
        refetch(); // This will refetch the attendance data
      },
    });
    setIsModalVisible(false);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleNavigate = (date) => {
    setSelectedYear(date.getFullYear());
    setSelectedMonth(date.getMonth());
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-center gap-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="mb-4 p-2 border-2 dark:bg-slate-700 dark:text-white rounded border-blue-400"
        >
          {moment.months().map((month, index) => (
            <option key={month} value={index}>
              {month}
            </option>
          ))}
        </select>

        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="mb-4 p-2 border-2 dark:bg-slate-700 dark:text-white border-blue-400 rounded"
        >
          {Array.from({ length: 10 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="h-[130vh] dark:bg-slate-700 dark:text-white bg-white p-4 rounded-md shadow-sm mx-4">
        {!attendanceLoading && !holidayLoading && (
          <Calendar
            className="dark:bg-slate-700 dark:text-white"
            localizer={localizer}
            events={events}
            views={["month"]}
            step={1}
            date={new Date(selectedYear, selectedMonth)}
            eventPropGetter={eventStyleGetter}
            components={{ event: CustomEvent }} // Use CustomEvent component for rendering events
            onNavigate={handleNavigate} // Handle navigation
          />
        )}
      </div>

      <Modal
        title="Edit Attendance"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            loading={isPending}
          >
            Ok
          </Button>,
        ]}
      >
        {selectedEvent && (
          <Form
            form={form}
            layout="vertical"
            initialValues={{
              loginTime: selectedEvent.attendanceEntry?.loginTime
                ? moment(selectedEvent.attendanceEntry.loginTime)
                : null,
              logoutTime: selectedEvent.attendanceEntry?.logoutTime
                ? moment(selectedEvent.attendanceEntry.logoutTime)
                : null,
            }}
          >
            <Form.Item label="Login Time" name="loginTime">
              <TimePicker format="h:mm a" />
            </Form.Item>
            <Form.Item label="Logout Time" name="logoutTime">
              <TimePicker format="h:mm a" />
            </Form.Item>
          </Form>
        )}
      </Modal>
      <div className="bg-white p-4 rounded-md shadow-sm mx-4 mb-4">
        <div className="flex gap-6 justify-center items-center">
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] bg-[#e53935]"></div>
            <p>Weekly Off / Absent</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] bg-[#7498d0]"></div>
            <p>Holiday</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-[20px] h-[20px] bg-[#1df52bc9]"></div>
            <p>Present</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserAttendance;
