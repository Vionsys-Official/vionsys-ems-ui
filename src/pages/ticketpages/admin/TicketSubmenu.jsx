import React from "react";
import AdminOpenTickets from "../../../ui/tickets/admin/AdminOpenTickets";
import AdminClosedTickets from "../../../ui/tickets/admin/AdminClosedTickets";
import ManageTickets from "../../../ui/tickets/admin/ManageTickets";
import { Link } from "react-router-dom";
import { useState } from "react";
const TicketSubMenu = () => {
  const [activeLink, setActiveLink] = useState("AdminOpen Tickets");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        {/* <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "AdminOpenTickets" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("AdminOpenTickets")}
        >
          Open Tickets
        </Link> */}
        {/* <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "AdminClosedTickets" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("AdminClosedTickets")}
        >
          Closed Tickets
        </Link> */}
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "Manage Tickets" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("Manage Tickets")}
        >
          Manage Tickets
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 ml-52 flex-1 w-full">
        {activeLink === "Open Tickets" && <AdminOpenTickets />}
        {activeLink === "Closed Tickets" && <AdminClosedTickets />}
        {activeLink === "Manage Tickets" && <ManageTickets />}
        {activeLink !== "Open Tickets" &&
          activeLink !== "Closed Tickets" &&
          activeLink !== "Manage Tickets" && (
            <div className="text-center">
              <p>No content available for this link</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default TicketSubMenu;