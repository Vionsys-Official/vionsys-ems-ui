import { RxDashboard } from "react-icons/rx";
import { HiOutlineClipboardDocumentList } from "react-icons/hi2";
import getUserIdRole from "../utils/getUserIdRole";
import { GoPeople } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Link } from "react-router-dom";
import { VscHistory } from "react-icons/vsc";
import { GoCrossReference } from "react-icons/go";
import { GoChecklist } from "react-icons/go";
import { IoNotificationsOutline } from "react-icons/io5";
import { Tooltip } from "antd";
import { SlCalender } from "react-icons/sl";
import { logout } from "../services/authApi";
import { FiLogOut } from "react-icons/fi";

import { useNavigate } from "react-router-dom";

const Sidebar = ({ isMobile }) => {
  const { role } = getUserIdRole();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div
      className={`${!isMobile ? "hidden" : ""
        }  sm:block h-full dark:bg-slate-800 dark:text-slate-100 bg-white text-slate-800 p-4 shadow-xl border shadow-gray-400`}
    >
      <div className="flex flex-col gap-6 justify-center items-center">
        {/* <img src={VionsysLogoImage} className="w-[50px] h-[50px]" alt="" /> */}
        <Tooltip title="Dashboard" placement="right">
          <Link to="/" className="hover:text-[#ee7714]">
            <RxDashboard size={25} />
          </Link>
        </Tooltip>

        {role === "user" && (
          <div className="flex flex-col gap-6 justify-center ">
            <Tooltip title="Todo Tasks" placement="right">
              <Link to="/taskpage" className="hover:text-[#ee7714]">
                <GoChecklist size={25} />
              </Link>
            </Tooltip>
            <Tooltip title="Notifications" placement="right">
              <Link to="/notifications" className="hover:text-[#ee7714]">
                <IoNotificationsOutline size={25} />
              </Link>
            </Tooltip>
            <Tooltip title="Leave Request" placement="right">
              <Link to="/LeaveMenu" className="hover:text-[#ee7714]">
                <GoCrossReference size={25} />
              </Link>
            </Tooltip>
          </div>
        )}

        {role !== "user" && (
          <div className="flex flex-col gap-6 justify-center">
            <Tooltip title="Employees" placement="right">
              <Link to="/employees" className="hover:text-[#ee7714]">
                <GoPeople size={25} />
              </Link>
            </Tooltip>
            <Tooltip title="Leave History" placement="right">
              <Link to="/AdminLeavePage" className="hover:text-[#ee7714]">
                <GoCrossReference size={25} />
              </Link>
            </Tooltip>
          </div>
        )}

        <Tooltip
          title="Logout"
          placement="left"
          className="flex justify-center items-center absolute bottom-0 pb-6"
        >
          <button className="dark:text-slate-100" onClick={handleLogout}>
            <FiLogOut size={25} />
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

export default Sidebar;
