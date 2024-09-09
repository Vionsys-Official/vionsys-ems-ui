import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreateResignation from "../../../ui/resignationUI/employee/CreateResignation";
import CheckRStatus from "../../../ui/resignationUI/employee/CheckRStatus";

const ResignationSubMenu = () => {
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
        <Link to={"/ResignationSubMenu"}
          onClick={() => handleLinkClick("/ResignationSubMenu")}
          className={`${isActive("/ResignationSubMenu") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}>
          Apply Resignation
        </Link>
        <Link to={"/resignationStatus"}
          onClick={() => handleLinkClick("/resignationStatus")}
          className={`${isActive("/resignationStatus") ? "text-blue-400 dark:text-white dark:font-bold" : ""} font-semibold`}
        >
          Check Status
        </Link>

      </div>
    </div>
  );
};

export default ResignationSubMenu;
