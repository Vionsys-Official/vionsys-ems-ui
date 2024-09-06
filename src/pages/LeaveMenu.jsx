import { Link, useLocation, useNavigate } from "react-router-dom";

import { useState } from "react";
import LeavesPages from "./leavespages/LeavesPages";
import LeavesHistory from "./leavespages/LeavesHistory";
import UserLeaveActivity from "./leavespages/UserLeaveActivity";
import UserCancleLeave from "./leavespages/UserCancleLeave";

const LeaveMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activePath, setIsActivePath] = useState(location.pathname);

  const handleLinkClick = (path) => {
    setIsActivePath(path);
    navigate(path);
  }

  const isActive = (path) => activePath === path;

  return (
    <div className="flex text-sm px-6 flex-col h-screen items-center gap-2 bg-gray-100 dark:bg-slate-700 shadow-lg py-10 mx-auto text-gray-900 dark:text-white">
      <div className="flex flex-col gap-2">
        <Link to={"/LeaveMenu"}
          onClick={() => handleLinkClick("/LeaveMenu")}
          className={`${isActive("/LeaveMenu") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}>
          Leave Request
        </Link>
        <Link to={"/cancelledLeaveList"}
          onClick={() => handleLinkClick("/cancelledLeaveList")}
          className={`${isActive("/cancelledLeaveList") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Cancelled Leaves
        </Link>
        <Link to={"/leaveActivities"}
          onClick={() => handleLinkClick("/leaveActivities")}
          className={`${isActive("/leaveActivities") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Leaves Activity
        </Link>
        <Link to={"/leaveHistory"}
          onClick={() => handleLinkClick("/leaveHistory")}
          className={`${isActive("/leaveHistory") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Leaves History
        </Link>
      </div>
    </div>
  );
};

export default LeaveMenu;
