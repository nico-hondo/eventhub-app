import { useState } from "react";
import { NavLink } from "react-router"
import { FiMoon } from "react-icons/fi";
import { IoNotificationsOutline } from "react-icons/io5";
import ModalIcon from "../../../features/auth/components/ModalIcon";

function Attendee({session, onLogout}) {
    const [show, setShow] = useState(false);
    const firstLetter = session.nama.split(' ').map(val => val[0]).join("");

    console.log(show);
  return (
    <>
        { show && <ModalIcon session={session} onClose={() => setShow(false)} onLogout={onLogout}/>}
        <header className="w-full sticky top-0 z-50 bg-white">
            <div className="px-7 py-4 flex justify-between items-center border border-gray-100">
                <div className="flex gap-6 items-center"> 
                    <div className="flex gap-2">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-200 bg-orange-500">E</span>
                        <h1 className="text-lg text-gray-800 font-medium">EventHub</h1>
                    </div>
                    <nav>
                        <ul className="flex gap-4">
                            <li className=""><NavLink to="/" className={({isActive}) => isActive ? "text-xs font-medium text-gray-700 bg-gray-300 px-3 py-1.5 rounded-lg" : "text-xs font-medium text-gray-600"}>Explore</NavLink></li>
                            <li><NavLink to="/events" className={({isActive}) => isActive ? "text-xs font-medium text-gray-700 bg-gray-300 px-3 py-1.5 rounded-lg" : "text-xs font-medium text-gray-600"}>Events</NavLink></li>
                            <li><NavLink to="/communities" className={({isActive}) => isActive ? "text-xs font-medium text-gray-700 bg-gray-300 px-3 py-1.5 rounded-lg" : "text-xs font-medium text-gray-600"}>Communities</NavLink></li>
                            <li><NavLink to="/my-events" className={({isActive}) => isActive ? "text-xs font-medium text-gray-700 bg-gray-300 px-3 py-1.5 rounded-lg" : "text-xs font-medium text-gray-600"}>My Events</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-5">
                    <IoNotificationsOutline className="text-md text-gray-800 cursor-pointer"/>
                    <FiMoon className="text-gray-800 cursor-pointer"/>
                    <div onClick={() => setShow(true)} className="w-7 h-7 flex justify-center items-center text-xs font-medium text-gray-100 text-center bg-orange-600 rounded-full cursor-pointer">
                        <span>{firstLetter}</span>
                    </div>
                </div>
            </div>
        </header>
    </>
  )
}

export default Attendee