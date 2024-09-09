import React from 'react'
import { Outlet } from 'react-router-dom'
import LeaveMenu from '../../pages/LeaveMenu'

const EmpLeaveLayout = () => {
    return (
        <div className="flex fixed h-screen w-[95%] bg-slate-200">
            <LeaveMenu />
            <div className="flex-1 flex flex-col dark:bg-slate-600">
                <main className="flex-1 overflow-x-scroll px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default EmpLeaveLayout