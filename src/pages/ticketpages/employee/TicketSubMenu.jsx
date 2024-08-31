import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmpOpenTickets from "../../../ui/tickets/employee/EmpOpenTickets";
import EmpClosedTickets from "../../../ui/tickets/employee/EmpClosedTickets";
import RaiseTicket from "../../../ui/tickets/employee/RaiseTicket";

const TicketSubMenu = () => {
  const [activeLink, setActiveLink] = useState("Raise Ticket");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Raise Ticket" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Raise Ticket")}
        >
          Raise Ticket
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Open Tickets" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Open Tickets")}
        >
          Open Tickets
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Closed Tickets" ? "font-bold text-blue-300" : ""
            }`}
          onClick={() => handleSidebarLinkClick("Closed Tickets")}
        >
          Closed Tickets
        </Link>
      </div>

      {/* Content */}
      <div className="p-4 ml-52 flex-1 w-full">
        {activeLink === "Open Tickets" && <EmpOpenTickets />}
        {activeLink === "Closed Tickets" && <EmpClosedTickets />}
        {activeLink === "Raise Ticket" && <RaiseTicket />}
        {activeLink !== "Open Tickets" &&
          activeLink !== "Closed Tickets" &&
          activeLink !== "Raise Ticket" && (
            <div className="text-center">
              <p>No content available for this link</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default TicketSubMenu;
