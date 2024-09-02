import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreateResignation from "../../../ui/resignationUI/employee/CreateResignation";
import CheckRStatus from "../../../ui/resignationUI/employee/CheckRStatus";

const ResignationSubMenu = () => {
  const [activeLink, setActiveLink] = useState("Apply Resignation");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "Apply Resignation" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("Apply Resignation")}
        >
          Apply Resignation
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "Check Status" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("Check Status")}
        >
          Check Status
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 ml-52 flex-1 w-full">
        {activeLink === "Apply Resignation" && <CreateResignation />}
        {activeLink === "Check Status" && <CheckRStatus />}
        {activeLink !== "Apply Resignation" &&
          activeLink !== "Check Status" && (
            <div className="text-center">
              <p>No content available for this link</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default ResignationSubMenu;
