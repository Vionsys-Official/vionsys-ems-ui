import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AllUsersList from '../../ui/AllUsersList';
import AttendanceList from '../../ui/AttendanceList';
import TaskHistory from '../taskpages/TaskHistory';
import HolidayCalander from '../../ui/HolidayCalander';

const EmployeesSubMenu = () => {
    const [activeLink, setActiveLink] = useState("Employee List");

    const handleSidebarLinkClick = (link) => {
        setActiveLink(link);
    };

    return (
        <div className="flex h-screen pt-[1px]">
            {/* Sidebar */}
            <div className="flex flex-1 dark:bg-slate-700 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Employee List" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Employee List")}
                >
                    Employee List
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Attendance List" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Attendance List")}
                >
                    Attendance List
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Employee Tasks" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Employee Tasks")}
                >
                    Employee Tasks
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Holiday Calendar" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Holiday Calendar")}
                >
                    Holiday Calendar
                </Link>
            </div>

            {/* Content */}
            <div className="p-4 ml-52 flex-1 w-full">
                {activeLink === "Employee List" && <AllUsersList />}
                {activeLink === "Attendance List" && <AttendanceList />}
                {activeLink === "Employee Tasks" && <TaskHistory />}
                {activeLink === "Holiday Calendar" && <HolidayCalander />}
                {activeLink !== "Employee List" &&
                    activeLink !== "Attendance List" &&
                    activeLink !== "Employee Tasks"
                    &&
                    activeLink !== "Holiday Calendar" && (
                        <div className="text-center">
                            <p>No content available for this link</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default EmployeesSubMenu