import React from 'react'
import LeavesSubMenu from './LeavesSubMenu';
import { Outlet } from 'react-router-dom';

const EmpLeavesLayout = () => {
    return (
        <div className="flex fixed h-screen w-[95%] bg-slate-200">
            <LeavesSubMenu />
            <div className="flex-1 flex flex-col dark:bg-slate-600">
                <main className="flex-1 overflow-x-scroll px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default EmpLeavesLayout;