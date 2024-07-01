
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import AdminCancleLeave from '../leavespages/AdminCancleLeave';
import AdminLeavePage from '../leavespages/AdminLeavePage';
const LeavesSubMenu = () => {
    const [activeLink, setActiveLink] = useState("Leave History");

    const handleSidebarLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="flex h-screen pt-[1px]">
            {/* Sidebar */}
            <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Leave History" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Leave History")}
                >
                    Leave Requests
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Canceled leaves" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Canceled leaves")}
                >
                    Cancelled leaves
                </Link>
            </div>

            {/* Content */}
            <div className="p-4 ml-44 flex-1 w-full">
                {activeLink === "Leave History" && <AdminLeavePage />}
                {activeLink === "Canceled leaves" && <AdminCancleLeave />}
                {activeLink !== "Leave History" &&
                    activeLink !== "Canceled leaves" && (
                        <div className="text-center">
                            <p>No content available for this link</p>
                        </div>
                    )}
            </div>
        </div>
    )
}

export default LeavesSubMenu