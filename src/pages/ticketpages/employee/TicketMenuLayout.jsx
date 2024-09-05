import React from 'react'
import { Outlet } from 'react-router-dom'
import TicketSubMenu from './TicketSubMenu'

const TicketMenuLayout = () => {
    return (
        <div className="flex fixed h-screen w-[95%] bg-slate-200">
            <TicketSubMenu />
            <div className="flex-1 flex flex-col dark:bg-slate-600">
                <main className="flex-1 overflow-x-scroll px-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default TicketMenuLayout