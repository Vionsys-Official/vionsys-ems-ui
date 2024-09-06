import  { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
 
const EmployeesSubMenu = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [activePath, setIsActivePath] = useState(location.pathname);
 
    const handleLinkClick = (path) => {
        setIsActivePath(path);
        navigate(path);
    }
 
    const isActive = (path) => activePath === path;
    return (
        <div className="flex text-sm px-6 flex-col h-screen items-center gap-2 dark:text-white dark:bg-slate-700 bg-gray-100 shadow-lg py-10 mx-auto text-gray-900">
        <div className="flex flex-col gap-2">
            <Link to={"/employees"}
                onClick={() => handleLinkClick("/employees")}
                className={`${isActive("/employees") ? "text-blue-300 dark:text-white dark:font-bold" : ""} font-semibold`}>
                Employeee List
            </Link>
            <Link to={"/attendanceList"}
                onClick={() => handleLinkClick("/attendanceList")}
                className={`${isActive("/attendanceList") ? "text-blue-300 dark:text-white dark:font-bold" : ""} font-semibold`}
            >
                Attendance List
            </Link>
            <Link to={"/employeesTasks"}
                onClick={() => handleLinkClick("/employeesTasks")}
                className={`${isActive("/employeesTasks") ? "text-blue-300 dark:text-white dark:font-bold" : ""} font-semibold`}
            >
                Employee Tasks
            </Link>
            <Link to={"/holidayCalendar"}
                onClick={() => handleLinkClick("/holidayCalendar")}
                className={`${isActive("/holidayCalendar") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
            >
               Holiday Calendar
            </Link>
        </div>
    </div>
    )
}
 
export default EmployeesSubMenu
 