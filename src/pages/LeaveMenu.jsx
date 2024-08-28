import { Link } from "react-router-dom";

import { useState } from "react";
import LeavesPages from "./leavespages/LeavesPages";
import LeavesHistory from "./leavespages/LeavesHistory";
import UserLeaveActivity from "./leavespages/UserLeaveActivity";
import UserCancleLeave from "./leavespages/UserCancleLeave";

const LeaveMenu = () => {
  const [activeLink, setActiveLink] = useState("Leave Request");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Leave Request" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Leave Request")}
        >
          Leave Request
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Cancled Leaves" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Cancled Leaves")}
        >
          Cancelled Leaves
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Leaves Activity" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Leaves Activity")}
        >
          Leaves Activity
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Leaves History" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Leaves History")}
        >
          Leaves History
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 ml-52 flex-1 w-full">
        {activeLink === "Leave Request" && <LeavesPages />}
        {activeLink === "Cancled Leaves" && <UserCancleLeave />}
        {activeLink === "Leaves Activity" && <UserLeaveActivity />}
        {activeLink === "Leaves History" && <LeavesHistory />}

        {activeLink !== "Leave Request" &&
          activeLink !== "Cancled Leaves" &&
          activeLink !== "Leaves Activity" &&
          activeLink !== "Leaves History" && (
            <div className="text-center">
              <p>No content available for this link</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default LeaveMenu;
