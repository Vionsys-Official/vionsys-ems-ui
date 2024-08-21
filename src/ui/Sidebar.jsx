import {
  MdNotifications,
  MdPeople,
  MdDashboard,
} from "react-icons/md";
import { FaTasks } from "react-icons/fa";
import { FcLeave } from "react-icons/fc";
import { IoLogOutOutline } from "react-icons/io5";
import getUserIdRole from "../utils/getUserIdRole";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Tooltip } from "antd";
import { useEffect, useRef, useState } from "react";
import { logout } from "../services/authApi";
import { GoCrossReference } from "react-icons/go";

const Sidebar = ({ isMobile, onClose }) => {
  const { role } = getUserIdRole();
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setActivePath] = useState(location.pathname);
  const sliderRef = useRef();

  useEffect(() => {
    const activeLink = document.querySelector(".sidebar-link.active");
    if (activeLink && sliderRef.current) {
      sliderRef.current.style.top = `${activeLink.offsetTop}px`;
    }
  }, [activePath,location.pathname]);

  const handleLogout = () => {
    logout();
    navigate("/login");
    if (isMobile) onClose();
  };

  const handleLinkClick = (path) => {
    setActivePath(path);
    if (isMobile) onClose();
  };

  const isActive = (path) => activePath === path;

  return (
    <div
      className={`${
        !isMobile ? "hidden" : ""
      } sm:block h-full dark:bg-slate-800 dark:text-slate-100 bg-[#7498d0] md:bg-slate-100 text-slate-800 p-4 shadow-xl border-r dark:border-slate-700 relative`}
    >
      <div className="flex flex-col gap-6 justify-center items-center mt-4 w-full">
        <div
          ref={sliderRef}
          className="hidden md:block absolute left-0 w-full h-11 bg-blue-100 border border-blue-400 z-0 rounded-l-full transition-all duration-300"
          style={{ top: -200 }}
        />
        <Tooltip title={isMobile?"":"Dashboard"} placement="right">
          <Link
            to="/"
            className={`sidebar-link flex items-center justify-center z-10 w-full p-2 rounded-lg transition-colors duration-200 ${
              isActive("/") ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800" : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
            }`}
            onClick={() => handleLinkClick("/")}
          >
            <MdDashboard size={25} />
            <p className="md:hidden ml-3">Dashboard</p>
          </Link>
        </Tooltip>

        {role === "user" && (
          <>
            <Tooltip title={isMobile?"":"Todo Tasks"} placement="right">
              <Link
                to="/taskpage"
                className={`sidebar-link flex items-center justify-center z-10 w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive("/taskpage") ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800" : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
                }`}
                onClick={() => handleLinkClick("/taskpage")}
              >
                <FaTasks size={25} />
                <p className="md:hidden ml-3">Todo Tasks</p>
              </Link>
            </Tooltip>
            <Tooltip title={isMobile?"":"Notifications"} placement="right">
              <Link
                to="/notifications"
                className={`sidebar-link flex items-center z-10 justify-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive("/notifications")
                    ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800"
                    : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
                }`}
                onClick={() => handleLinkClick("/notifications")}
              >
                <MdNotifications size={25} />
                <p className="md:hidden ml-3">Notifications</p>
              </Link>
            </Tooltip>
            <Tooltip title={isMobile?"":"Leave Request"} placement="right">
              <Link
                to="/LeaveMenu"
                className={`sidebar-link z-10 flex items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive("/LeaveMenu")
                    ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800"
                    : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
                }`}
                onClick={() => handleLinkClick("/LeaveMenu")}
              >
                <FcLeave size={25} />
                <p className="md:hidden ml-3">Leave Request</p>
              </Link>
            </Tooltip>
          </>
        )}

        {role !== "user" && (
          <>
            <Tooltip title={isMobile?"":"Employees"} placement="right">
              <Link
                to="/employees"
                className={`sidebar-link z-10 flex items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive("/employees")
                    ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800"
                    : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
                }`}
                onClick={() => handleLinkClick("/employees")}
              >
                <MdPeople size={25} />
                <p className="md:hidden ml-3">Employees</p>
              </Link>
            </Tooltip>
            <Tooltip title={isMobile?"":"Leave History"} placement="right">
              <Link
                to="/AdminLeavePage"
                className={`sidebar-link z-10 flex items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 ${
                  isActive("/AdminLeavePage")
                    ? "active md:text-[#7498d0] text-slate-100 md:dark:text-slate-800"
                    : "text-slate-100 md:text-[#7498d0] dark:text-slate-100"
                }`}
                onClick={() => handleLinkClick("/AdminLeavePage")}
              >
                <GoCrossReference size={25} />
                <p className="md:hidden ml-3">Leave History</p>
              </Link>
            </Tooltip>
          </>
        )}
        <Tooltip
          title="Logout"
          placement="right"
          className="flex items-center justify-center w-full p-2 rounded-lg transition-colors duration-200 absolute bottom-6"
        >
          <button
            className="flex items-center justify-center w-full text-red-600"
            onClick={handleLogout}
          >
            <IoLogOutOutline size={25} />
            <p className="md:hidden ml-3">Logout</p>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
