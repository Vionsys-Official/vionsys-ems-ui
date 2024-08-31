import React, { useState } from "react";
import { Link } from "react-router-dom";
import EmpOpenTickets from "../../../ui/tickets/employee/EmpOpenTickets";
import EmpClosedTickets from "../../../ui/tickets/employee/EmpClosedTickets";
import RaiseTicket from "../../../ui/tickets/employee/RaiseTicket";

const TicketSubMenu = () => {
  const [activeLink, setActiveLink] = useState("");

  const handleSidebarLinkClick = (link) => {
    setActiveLink(link);
  };
  return (
    <div className="flex h-screen pt-[1px]">
      {/* Sidebar */}
      <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "RaiseTicket" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("RaiseTicket")}
        >
          Raise Ticket
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "EmpOpenTickets" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("EmpOpenTickets")}
        >
          Open Tickets
        </Link>
        <Link
          className={`flex gap-2 hover:text-blue-400 rounded-md ${
            activeLink === "EmpClosedTickets" ? "font-bold text-blue-300" : ""
          }`}
          onClick={() => handleSidebarLinkClick("EmpClosedTickets")}
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
