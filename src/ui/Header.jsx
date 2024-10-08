import { HiMenu } from "react-icons/hi";
import ThemeButton from "./ThemeButton";
import {
  Button,
  Drawer,
  Avatar,
  Input,
  Menu,
  Dropdown,
  Tooltip,
  List,
} from "antd";
import VionsysLogoImage from "/assets/vionsys_logo.png";
import getUserIdRole from "../utils/getUserIdRole";
import Sidebar from "./Sidebar";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { IoIosSearch } from "react-icons/io";
import { IoLogOutOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authApi";
import sendverifymail from "../features/authentication/useVerifyMail";
import { useState, useEffect, useRef } from "react";

const Header = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [filteredItems, setFilteredItems] = useState([]); // State for filtered search results
  const searchRef = useRef(null); // To detect clicks outside
  const softwareVersion = import.meta.env.VITE_APP_VERSION;
  const { id } = getUserIdRole();
  const { user: userData, isPending: userLoading } = useGetCurrentUser(id);
  const { sendmail, isPending } = sendverifymail();

  const navigate = useNavigate();

  // List of searchable items
  const searchItems = [
    { label: "Dashboard", link: "/home" },
    { label: "Profile", link: "/home" },
    { label: "Previous Experience", link: "/home" },
    { label: "Joining Kit", link: "/home" },
    { label: "Calendar", link: "/home" },
    { label: "Attendance", link: "/home" },
    { label: "Holiday Calender", link: "/home" },
    { label: "Todo Tasks", link: "/taskpage" },
    { label: "Notifications", link: "/notifications" },
    { label: "Leave Request", link: "/LeaveMenu" },
    { label: "Cancelled Leaves", link: "/cancelledLeaveList" },
    { label: "Leaves Activity", link: "/leaveActivities" },
    { label: "Leaves History", link: "/leaveHistory" },
    { label: "Raise Ticket", link: "/TicketSubmenu" },
    { label: "Open Tickets", link: "/empOpenTickets" },
    { label: "Closed Tickets", link: "/empClosedTickets" },
    { label: "Apply Resignation", link: "/ResignationSubMenu" },
    { label: "Check Status", link: "/resignationStatus" },
    // Add more items as needed
  ];

  const onClose = () => setOpen(false);

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value) {
      const filtered = searchItems.filter((item) =>
        item.label.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems([]);
    }
  };

  const handleResetPassword = () => {
    navigate("/ForgotPassword");
  };

  const handleSendVerifyEmail = (email) => {
    if (userData?.data?.user?.isVerified) {
      console.log("Email is already verified.");
      return;
    }
    console.log("Sending email to:", email);
    sendmail(email);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    onClose();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchTerm("");
        setFilteredItems([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const menu = (
    <Menu
      className="w-[15vw] p-10 text-black flex flex-col gap-2 text-center font-bold"
      mode="vertical"
      style={{ border: "none", padding: 15 }}
    >
      <Menu.Item
        key="1"
        onClick={handleResetPassword}
        className="border"
      >
        Reset Password
      </Menu.Item>
      <Menu.Item
        key="2"
        onClick={() => handleSendVerifyEmail(userData?.data?.user?.email)}
        className="border"
        disabled={userData?.data?.user?.isVerified || isPending}
      >
        {!isPending
          ? userData?.data?.user?.isVerified
            ? "Already Verified !!"
            : "Verify Email"
          : "Sending mail..."}
      </Menu.Item>
      <Menu.Item
        key="4"
        onClick={handleLogout}
        className=" border"
      >
        <div className="flex text-center text-red-500 font-semibold pl-6">
          <IoLogOutOutline className="text-red-500 text-center" size={25} />
          <span className="ml-2 text-md">Log Out</span>
        </div>
      </Menu.Item>

      {/* Version Display at the End */}
      <Menu.Item
        key="version"
        className="text-gray-900 border-b mt-2 pt-2"
        disabled
      >
        Version {softwareVersion}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="fixed top-0 left-0 w-full bg-[#7498d0] dark:bg-slate-800 text-white dark:text-slate-100 px-5 py-2 shadow-lg flex justify-between items-center z-50 transition-all duration-300 ease-in-out">
      <div className="flex gap-4 items-center">
        <Link to={"/home"}>
          <div className="p-2 bg-white rounded-lg flex items-center justify-center shadow-md transition-transform transform hover:scale-105">
            <img
              src={VionsysLogoImage}
              className="md:w-[20px] md:h-[20px] w-[45px] h-[35px]"
              alt="Vionsys Logo"
            />
          </div>
        </Link>
        <h1 className="md:text-lg uppercase font-semibold text-[16px] hidden md:block">
          Vionsys IT Solutions India Pvt. Ltd.
        </h1>
      </div>
      <div
        className="hidden sm:flex gap-6 items-center relative"
        ref={searchRef}
      >
        <div className="relative flex items-center w-64">
          <Input
            className="px-4 py-1 w-full rounded-full bg-gray-100 text-gray-800 border border-gray-500 shadow-inner shadow-gray-400"
            placeholder="Search for option"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <IoIosSearch
            size={24}
            className="absolute right-3 cursor-pointer text-blue-600 transition-colors duration-200 hover:text-blue-500"
          />
        </div>
        {/* Display dropdown with filtered items */}
        {searchTerm && filteredItems.length > 0 && (
          <div
            className="absolute bg-slate-50 shadow-md rounded-lg w-64 mt-2 z-50"
            style={{ top: "100%" }}
          >
            <div className="flex justify-end p-2">
              <Button
                onClick={() => setSearchTerm("")}
                size="small"
                className="text-red-600 font-medium"
              >
                Close
              </Button>
            </div>
            <List
              className="text-center w-full" // Ensure List takes full width
              dataSource={filteredItems}
              renderItem={(item) => (
                <List.Item
                  className="hover:bg-gray-300 h-10 flex justify-center items-center"
                  style={{ width: "100%" }} // Ensure item takes full width
                >
                  <Link
                    to={item.link}
                    className="w-full text-center" // Center text in the link
                    style={{ color: "black", textDecoration: "none" }}
                  >
                    {item.label}
                  </Link>
                </List.Item>
              )}
            />
          </div>
        )}

        <ThemeButton />
        <Tooltip title={`Setting`}>
          <Dropdown menu={menu} trigger={["click"]} placement="bottomRight">
            <Avatar
              src={userData?.data?.user?.profile}
              alt="User Profile"
              size={"medium"}
              className="shadow-md transition-transform transform hover:scale-105 border-gray-700 dark:border-white cursor-pointer"
            />
          </Dropdown>
        </Tooltip>
      </div>
      <div className="flex sm:hidden gap-4 items-center">
        <ThemeButton />
        <Button
          className="bg-transparent border-0 text-white focus:outline-none hover:scale-105"
          onClick={() => setOpen(true)}
        >
          <HiMenu size={25} />
        </Button>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
        width={240}
        className="sm:hidden"
      >
        <Sidebar isMobile={true} onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default Header;
