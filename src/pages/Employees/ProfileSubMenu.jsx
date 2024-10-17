import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserDetails from '../UserDetails';
import JoiningKitOfEmpForAdmin from '../welcomeKit/AdminKit';
import PreviousWork from '../../ui/user/PreviousWork';
import Documents from "../../ui/user/Documents"

const ProfileSubMenu = () => {
    const [activeLink, setActiveLink] = useState("Profile");

    const handleSidebarLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="flex w-full h-screen pt-[1px] gap-4">
            {/* Sidebar */}
            <div className="flex fixed text-sm flex-col items-center w-auto h-full text-black dark:text-white dark:bg-slate-700 bg-slate-50 px-6 py-10  gap-2 shadow-md">
                <div className='flex flex-col gap-2'>
                    <Link
                        className={`flex gap-2 hover:text-blue-400 dark:hover:text-white rounded-md ${activeLink === "Profile" ? "text-blue-300 dark:text-white dark:font-bold" : ""
                            }`}
                        onClick={() => handleSidebarLinkClick("Profile")}
                    >
                        Profile
                    </Link>
                    <Link
                        className={`flex gap-2 hover:text-blue-400 dark:hover:text-white rounded-md ${activeLink === "Joining Kit" ? " text-blue-300 dark:text-white dark:font-bold" : ""
                            }`}
                        onClick={() => handleSidebarLinkClick("Joining Kit")}
                    >
                        Joining Kit
                    </Link>
                    <Link
                        className={`flex gap-2 hover:text-blue-400 dark:hover:text-white rounded-md ${activeLink === "Previous Experience" ? " text-blue-300 dark:text-white dark:font-bold" : ""
                            }`}
                        onClick={() => handleSidebarLinkClick("Previous Experience")}
                    >
                        Previous Experience
                    </Link>
                    <Link
                        className={`flex gap-2 hover:text-blue-400 dark:hover:text-white rounded-md ${activeLink === "Documents" ? " text-blue-300 dark:text-white dark:font-bold" : ""
                            }`}
                        onClick={() => handleSidebarLinkClick("Documents")}
                    >
                        Documents
                    </Link>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 ml-40 flex-1 w-full">
                {activeLink === "Profile" && <UserDetails />}
                {activeLink === "Joining Kit" && <JoiningKitOfEmpForAdmin />}
                {activeLink === "Previous Experience" && <PreviousWork />}
                {activeLink === "Documents"&& <Documents/>}
            </div>
        </div>
    )
}

export default ProfileSubMenu