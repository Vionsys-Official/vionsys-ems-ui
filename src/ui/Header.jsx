import { HiMenu } from "react-icons/hi";
import ThemeButton from "./ThemeButton";
import { Button, Drawer, Avatar, Input } from "antd";
import VionsysLogoImage from "/assets/vionsys_logo.png";
import getUserIdRole from "../utils/getUserIdRole";
import Sidebar from './Sidebar';
import { useState } from "react";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { IoIosSearch } from "react-icons/io";

const Header = () => {
  const [open, setOpen] = useState(false);
  const onClose = () => setOpen(false);
  const { id } = getUserIdRole();
  const { user } = useGetCurrentUser(id);

  return (
    <div className="fixed top-0 left-0 w-full bg-[#7498d0] dark:bg-slate-800 text-white dark:text-slate-100 px-5 py-2 shadow-lg flex justify-between items-center z-50 transition-all duration-300 ease-in-out">
      <div className="flex gap-4 items-center">
        <div className="p-2 bg-white rounded-lg flex items-center justify-center shadow-md transition-transform transform hover:scale-105">
          <img src={VionsysLogoImage} className="md:w-[20px] md:h-[20px] w-[45px] h-[35px]" alt="Vionsys Logo" />
        </div>
        <h1 className="md:text-lg uppercase font-semibold text-[16px] hidden md:block">
          Vionsys IT Solutions India Pvt. Ltd.
        </h1>
      </div>
      <div className="hidden sm:flex gap-6 items-center">
        <div className="relative flex items-center w-64">
          <Input 
            className="px-4 py-1 w-full rounded-full bg-gray-200 text-gray-800 border border-gray-500 shadow-inner shadow-gray-400"
            placeholder="Search"
          />
          <IoIosSearch size={24} className="absolute right-3 cursor-pointer text-gray-400 transition-colors duration-200 hover:text-blue-500" />
        </div>
        <ThemeButton />
        <Avatar 
          src={user?.data?.user?.profile} 
          alt="User Profile" 
          size={"medium"} 
          className="shadow-md transition-transform transform hover:scale-105 border-gray-700 dark:border-white"
        />
      </div>
      <div className="flex sm:hidden gap-4 items-center">
        <ThemeButton />
        <Button className="bg-transparent border-0 text-white focus:outline-none hover:scale-105" onClick={() => setOpen(true)}>
          <HiMenu size={22} />
        </Button>
      </div>
      <Drawer
        title="Menu"
        placement="right"
        onClose={onClose}
        open={open}
        width={240}  // Reduced width of the drawer
        className="sm:hidden"
      >
        <Sidebar isMobile={true} onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default Header;
