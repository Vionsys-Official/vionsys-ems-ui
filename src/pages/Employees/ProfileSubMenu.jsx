import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetails from '../UserDetails';
import JoiningKit from '../../ui/user/JoiningKit';
import JoiningKitOfEmpForAdmin from '../welcomeKit/AdminKit';
import PreviousWork from '../../ui/user/PreviousWork';
const ProfileSubMenu = () => {
    const [activeLink, setActiveLink] = useState("Profile");

    const handleSidebarLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="flex h-screen pt-[1px]">
            {/* Sidebar */}
            <div className="flex flex-1 flex-col h-full fixed bg-slate-50 px-8 py-10  gap-2 shadow-md">
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Profile" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Profile")}
                >
                    Profile
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Joining Kit" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Joining Kit")}
                >
                    Joining Kit
                </Link>
                <Link
                    className={`flex gap-2 hover:text-blue-400 rounded-md ${activeLink === "Previous Work" ? "font-bold text-blue-300" : ""
                        }`}
                    onClick={() => handleSidebarLinkClick("Previous Work")}
                >
                    Previous Work
                </Link>
            </div>

            {/* Content */}
            <div className="p-4 ml-40 flex-1 w-full">
                {activeLink === "Profile" && <UserDetails />}
                {activeLink === "Joining Kit" && <JoiningKitOfEmpForAdmin />}
                {activeLink === "Previous Work" && <PreviousWork />}
            </div>
        </div>
    )
}

export default ProfileSubMenu