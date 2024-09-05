import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useGetAttendance from "../../features/attendance/useGetAttendance";
import "../../utils/css/attendance.css";
import getholidayList from "../../features/holiday/useGetHolidays";

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
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  
  const { data: employeesData, isPending: attendanceLoading } =
    useGetAttendance({ uid: user?.uid || null, year: selectedYear, month: selectedMonth });

  const userAttendance = employeesData?.data?.attendance;
  //   console.log(userAttendance)
  const {
    data: holidayList,
    isPending: holidayLoading,
  } = getholidayList(selectedYear);

  //   console.log(holidayList?.fixedHolidays);
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

      // Include weekly offs for all dates
      if (
        isWeeklyOff(date) ||
        isAlternateSaturdayOff(date) ||
        isAlternateSundayOff(date)
      ) {
        processedEvents.push({
          title: "WO",
          start: new Date(dateString),
          end: new Date(dateString),
          type: "weeklyOff",
          classNames: "weeklyOff",
        });
      } else {
        const holiday = fixedHolidayList.find(
          (entry) => moment(entry.date).format("YYYY-MM-DD") === dateString
        );
        if (holiday) {
          // If the date is a holiday, mark it as HO (Holiday) with blue color
          processedEvents.push({
            title: "HO",
            desc: holiday.holidayName,
            start: new Date(dateString),
            end: new Date(dateString),
            type: "holiday",
            classNames: "holiday",
          });
        } else {
          // Check if there is attendance data for the date
          const attendanceEntry = attendanceData?.find(
            (entry) => moment(entry.date).format("YYYY-MM-DD") === dateString
          );

          // If attendance data exists, determine if the employee is present or absent
          if (attendanceEntry) {
            const loginTime = new Date(attendanceEntry?.loginTime);
            const logoutTime = attendanceEntry?.logoutTime
              ? new Date(attendanceEntry.logoutTime)
              : null;

              if (loginTime <= today) {
                if (logoutTime) {
                // Calculate work time duration
                const duration = moment.duration(logoutTime - loginTime);
                const hours = duration.hours();
                const minutes = duration.minutes();

                // Handle NaN cases
                const workTime =
                  isNaN(hours) || isNaN(minutes)
                    ? "NA"
                    : `${hours} hrs : ${minutes} mins`;

                    // Employee is present
                processedEvents.push({
                  title: "P",
                  work: workTime,
                  desc: `${moment(loginTime).format("hh:mm")} - ${moment(
                    logoutTime
                  ).format("hh:mm")}`,
                  start: new Date(dateString),
                  end: new Date(dateString),
                  type: "present",
                  classNames: "present",
                });
              } else {
                // Employee is present but logoutTime is missing
                processedEvents.push({
                  title: "P",
                  work: "NA",
                  desc: `${moment(loginTime).format("hh:mm")} - NA`,
                  start: new Date(dateString),
                  end: new Date(dateString),
                  type: "present",
                  classNames: "present",
                });
              }
            }
          } else if (date <= today) {
            // Employee is absent
            processedEvents.push({
              title: "A",
              start: new Date(dateString),
              end: new Date(dateString),
              type: "absent",
              classNames: "absent",
            });
          }
        }
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
    }

    return { style };
  };

  // Custom Event component to include login and logout times
  const CustomEvent = ({ event }) => (
    <div>
      <strong className="text-sm">{event.title}</strong>
      {event.desc && (
        <div className="text-[13px] font-semibold">{event.desc}</div>
      )}
      <span>
        {event.work && (
          <div className="text-[10px] font-semibold">{event.work}</div>
        )}
      </span>
    </div>
  );

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

      <div className="bg-white dark:bg-slate-700 dark:text-white p-4 rounded-md shadow-sm mx-4 mb-4">
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
