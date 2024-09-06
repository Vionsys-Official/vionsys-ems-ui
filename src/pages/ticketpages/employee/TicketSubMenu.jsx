import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const TicketSubMenu = () => {
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
        <Link to={"/TicketSubMenu"}
          onClick={() => handleLinkClick("/TicketSubMenu")}
          className={`${isActive("/TicketSubMenu") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}>
          Raise Ticket
        </Link>
        <Link to={"/empOpenTickets"}
          onClick={() => handleLinkClick("/empOpenTickets")}
          className={`${isActive("/empOpenTickets") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Open Tickets
        </Link>
        <Link to={"/empClosedTickets"}
          onClick={() => handleLinkClick("/empClosedTickets")}
          className={`${isActive("/empClosedTickets") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Closed Tickets
        </Link>

      </div>
    </div>
  );
};

export default TicketSubMenu;
