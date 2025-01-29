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
  const dayOfWeek = moment(date).day(); // Get the day of the week (0 = Sunday, 6 = Saturday)
  return dayOfWeek === 0 || dayOfWeek === 6; // Week off for Sunday (0) and Saturday (6)
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
  console.log("userAttendance:", userAttendance);

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

  const generateAttendanceEvent = (attendanceEntry, holiday, isWO) => {
    let event = {
      title: attendanceEntry?.status || "A", // Default to "Absent"
      desc: attendanceEntry?.remarks || "",
      type: "attendance",
      classNames: "attendance",
      work: attendanceEntry?.work || "",
      loginDevice: attendanceEntry?.loginDevice,
      logoutDevice: attendanceEntry?.logoutDevice,
    };

    // If attendance is marked as "Present"
    if (attendanceEntry?.status === "P") {
      event = {
        ...event,
        title: "P",
        classNames: "present",
        work: "Worked on assigned tasks", // Example work description
      };
    }

    // Add holiday-related data if applicable
    if (holiday) {
      event = {
        ...event,
        title: "HO",
        desc: holiday.holidayName,
        type: "holiday",
        classNames: "holiday",
      };
    }

    // Handle Weekly Off or Absent
    if (isWO) {
      event = {
        ...event,
        title: "WO",
        type: "weeklyOff",
        classNames: "weeklyOff",
      };
    }

    return event;
  };

  const generateEvents = (attendanceData, fixedHolidayList) => {
    const processedEvents = [];
    const attendanceMap = new Map(
      attendanceData?.map((entry) => [
        moment(entry.date).format("YYYY-MM-DD"),
        entry,
      ])
    );
    const holidayMap = new Map(
      fixedHolidayList.map((entry) => [
        moment(entry.date).format("YYYY-MM-DD"),
        entry,
      ])
    );

    for (
      let date = moment(new Date(selectedYear, selectedMonth, 1));
      date.isSameOrBefore(new Date(selectedYear, selectedMonth + 1, 0));
      date.add(1, "day")
    ) {
      const dateString = date.format("YYYY-MM-DD");

      // Check attendance and holiday
      const attendanceEntry = attendanceMap.get(dateString);
      const holiday = holidayMap.get(dateString);

      const isWO = isWeeklyOff(date.toDate()); // Updated logic for week off
      const today = new Date();

      if (attendanceEntry) {
        let loginTime = new Date(attendanceEntry?.loginTime);
        let logoutTime = attendanceEntry?.logoutTime
          ? new Date(attendanceEntry.logoutTime)
          : null;

        // Adjust logout time if it is earlier than login time (shift crosses midnight)
        if (logoutTime && logoutTime < loginTime) {
          logoutTime.setDate(logoutTime.getDate() + 1); // Adjust by adding 1 day
        }

        // Ensure both times are in the local timezone
        loginTime = moment(loginTime).local().toDate();
        logoutTime = logoutTime ? moment(logoutTime).local().toDate() : null;

        // Calculate work time duration
        const duration = logoutTime
          ? moment.duration(moment(logoutTime).diff(moment(loginTime)))
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

        // Push the event to the processed events list
        processedEvents.push({
          title,
          loginDevice: attendanceEntry?.loginDevice,
          logoutDevice: attendanceEntry?.logoutDevice,
          loginTime: loginTime,
          logoutTime: logoutTime,
          work: workTime,
          desc: `${moment(loginTime).format("HH:mm")} - ${
            logoutTime ? moment(logoutTime).format("HH:mm") : "NA"
          }`,
          start: new Date(dateString),
          end: new Date(dateString),
        });
      } else if (holiday) {
        // Holiday event
        processedEvents.push({
          title: "HO",
          desc: holiday.holidayName,
          start: new Date(dateString),
          end: new Date(dateString),
          type: "holiday",
          classNames: "holiday",
        });
      } else if (isWO) {
        // Weekly Off event
        processedEvents.push({
          title: "WO",
          start: new Date(dateString),
          end: new Date(dateString),
          type: "weeklyOff",
          classNames: "weeklyOff",
        });
      } else if (date.toDate() <= today) {
        // Absent event
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
    console.log(event);
    // Set selected event data
    setSelectedEvent(event);

    // Check and set form values based on event data
    form.setFieldsValue({
      loginTime: event?.loginTime ? moment(event.loginTime) : undefined, // Leave undefined if loginTime is not available

      logoutTime: event?.logoutTime ? moment(event.logoutTime) : undefined, // Leave undefined if logoutTime is not available
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

    let logoutTime = values.logoutTime
      ? moment(selectedEvent.start)
          .set({
            hour: values.logoutTime.hour(),
            minute: values.logoutTime.minute(),
          })
          .toISOString()
      : null;

    // Adjust logout time if it is earlier than login time (i.e., crosses midnight)
    if (logoutTime && moment(logoutTime).isBefore(moment(loginTime))) {
      logoutTime = moment(logoutTime).add(1, "day").toISOString(); // Add one day to logout time
    }

    const userId = user.uid;
    const attendanceData = {
      userId,
      date: moment(selectedEvent.start).local().toISOString(), // Adjust event start time to local timezone
      loginTime: loginTime ? moment(loginTime).local().toISOString() : null, // Adjust login time to local timezone
      logoutTime: logoutTime ? moment(logoutTime).local().toISOString() : null, // Adjust logout time to local timezone
    };

    console.log("attendanceData : ", attendanceData);

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
              loginTime: selectedEvent?.loginTime
                ? moment(selectedEvent.loginTime)
                : undefined,
              logoutTime: selectedEvent?.logoutTime
                ? moment(selectedEvent.logoutTime)
                : undefined,
            }}
          >
            <Form.Item label="Login Time" name="loginTime">
              <TimePicker format="HH:mm" />
            </Form.Item>

            <Form.Item label="Logout Time" name="logoutTime">
              <TimePicker format="HH:mm" />
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
