
import { HiMenu } from "react-icons/hi";
import ThemeButton from "./ThemeButton";
import { Button, Drawer } from "antd";
import VionsysLogoImage from "/assets/vionsys_logo.png";
import getUserIdRole from "../utils/getUserIdRole";
import Sidebar from './Sidebar'
import { useState } from "react";
import useGetCurrentUser from "../features/users/useGetCurrentUser";
import { CiSearch } from "react-icons/ci";

import { Avatar } from 'antd';
import { Input } from 'antd';

const Header = () => {
  const [open, setOpen] = useState(false);



  const onClose = () => {
    setOpen(false);
  }

  const { id } = getUserIdRole();
  const { user, isPending } = useGetCurrentUser(id);
  return (
    <div className="dark:bg-slate-800 fixed dark:text-slate-100 px-2 py-1 flex justify-between w-full bg-[#7498d0] text-white">
      <div className="flex gap-4 items-center">
        <div className="p-2 bg-white rounded-full"><img src={VionsysLogoImage} className="w-[25px] h-[25px]" alt="" /></div>
        <h1 className="text-lg font-bold uppercase">
          <span>Vionsys IT </span>
          Solutions India pvt. ltd.</h1>
      </div>

      <div className="flex gap-6 items-center">
        <div className="relative flex gap-4 justify-center items-center mx-3 w-[340px]">
          <Input className="px-2" placeholder="Search" />
          <CiSearch size={20} className="absolute right-2 cursor-pointer" />
        </div>
        <ThemeButton />
        <Avatar src={user?.data?.user?.profile} alt="" size={"large"} />
      </div>
      <Button className="cursor-pointer sm:hidden" onClick={() => setOpen(true)}>
        <HiMenu />
      </Button>
      <Drawer title="Basic Drawer" onClose={onClose} open={open}>
        <Sidebar isMobile={true} />
      </Drawer>
    </div>
  );
};

export default Header;
