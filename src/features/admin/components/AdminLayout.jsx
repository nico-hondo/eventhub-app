import { NavLink, Outlet } from "react-router";
import { FiShield } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";

function AdminLayout() {
    return (
        <main className="w-full min-h-screen">
            <section className="w-full flex flex-col items-center gap-6">
                <div className="w-full max-w-5xl flex-1 flex flex-col gap-8 py-5">    
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 flex justify-center items-center text-xl bg-orange-100 text-orange-600 rounded-xl"><FiShield/></div>
                        <div className="w-full ">
                            <h2 className="text-xl text-gray-900 font-medium">Admin Dashboard</h2>
                            <p className="text-xs text-gray-600">Platform management and moderation</p>
                        </div>
                    </div>
                    <div className="w-full flex gap-4 h-10 text-xs border-b border-gray-300">
                        <NavLink end to="" className={({ isActive }) =>`${isActive ? "text-orange-600 border-b border-orange-700 font-medium" : 'text-gray-500'} w-25 flex gap-2 justify-center items-center`}><FiShield/> Overview</NavLink>
                        <NavLink end to="users" className={({ isActive }) =>`${isActive ? "text-orange-600 border-b border-orange-700 font-medium" : 'text-gray-500'} w-20 flex gap-2 justify-center items-center`}><FiUsers/>Users</NavLink>
                        <NavLink end to="events" className={({ isActive }) =>`${isActive ? "text-orange-600 border-b border-orange-700 font-medium" : 'text-gray-500'} w-20 flex gap-2 justify-center items-center`}><IoCalendarOutline/>Events</NavLink>
                        <NavLink end to="communities" className={({ isActive }) =>`${isActive ? "text-orange-600 border-b border-orange-700 font-medium" : 'text-gray-500'} w-30 flex gap-2 justify-center items-center`}><FiUsers/>Communities</NavLink>
                    </div>
                </div>
            </section>
            <Outlet/>
        </main>
    )
}

export default AdminLayout