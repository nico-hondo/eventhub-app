import { useState, useContext } from 'react';
import notification from '../../../data/notification.json';

import { MdOutlineMarkEmailRead } from "react-icons/md";
import { NavLink, Outlet } from "react-router";
import themeContext from '../../../context/theme/themeContext';

function NotifLayout() {
    const [unRead] = useState(() => {
        return notification.filter(val => val.status === 'unread')
    })

    const {theme} = useContext(themeContext);
  return (
    <main className={`w-full flex flex-col justify-center items-center gap-6 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <section className={`w-full flex justify-center items-center border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
            <div className="w-full max-w-5xl flex flex-col gap-6 pt-8">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                            <h2 className={`text-2xl ${theme === 'light' ? 'text-gray-900' : 'text-gray-200'} font-semibold`}>Notifications</h2>
                            <span className="px-2  bg-orange-600 text-white rounded-full text-[11px] font-medium">{unRead.length}</span>
                        </div>
                        <p className="text-sm text-gray-500 ">Stay up to date with your events and communities</p>
                    </div>
                    <button className={`flex items-center justify-center w-35 h-8 gap-1 ${theme === 'light' ? 'text-gray-800 border-gray-300' : 'text-gray-300 border-gray-600'} text-xs font-medium border rounded-lg cursor-pointer`}>
                        <MdOutlineMarkEmailRead/>
                        Mark all as read
                    </button>
                </div>
                <div className="flex items-center gap-2 pb-4">
                    <NavLink end to="" className={({ isActive }) =>`${isActive ? "text-gray-100 bg-orange-600 font-medium cursor-pointer" : "font-medium cursor-pointer border border-gray-300 text-gray-500"} w-10 h-7 rounded-lg text-xs flex justify-center items-center`}>All</NavLink>
                    <NavLink end to="unread" className={({ isActive }) =>`${isActive ? "text-gray-100 bg-orange-600 font-medium cursor-pointer" : "font-medium cursor-pointer border border-gray-300 text-gray-500"} w-23 h-7 rounded-lg text-xs flex justify-center items-center`}>Unread ({unRead.length})</NavLink>
                </div>
            </div>
        </section>
        <section className="w-full min-h-110 flex justify-center items-center">
            <Outlet/>
        </section>
    </main>
  )
}

export default NotifLayout