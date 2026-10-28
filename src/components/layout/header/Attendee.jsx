import { useState, useRef, useContext } from "react";
import { NavLink } from "react-router"
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import ModalIcon from "../../../features/auth/components/ModalIcon";
import themeContext from "../../../context/theme/themeContext";

function Attendee({session, onLogout}) {
    const [show, setShow] = useState(false);
    const triggerRef = useRef(null);
    
    const {theme, toogleTheme} = useContext(themeContext);
  return (
    <>
        <header className={`w-full sticky top-0 z-50 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <div className={`px-7 py-4 flex justify-between items-center ${theme === 'light' ? 'border-b' : 'border-none'} border-gray-100`}>
                <div className="flex gap-6 items-center"> 
                    <div className="flex gap-2">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-200 bg-orange-500">E</span>
                        <h1 className={`text-lg ${theme==='light' ? 'text-gray-800' : 'text-gray-200'} font-medium`}>EventHub</h1>
                    </div>
                    <nav className="hidden lg:flex">
                        <ul className="flex gap-4">
                            <li className=""><NavLink to="/" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Explore</NavLink></li>
                            <li><NavLink to="/events" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Events</NavLink></li>
                            <li><NavLink to="/communities" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Communities</NavLink></li>
                            <li><NavLink to="/my-events" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>My Events</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-5">
                    <NavLink to="notification" className={({isActive}) => isActive ? "text-orange-500" : `${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
                        <IoNotificationsOutline className="text-md cursor-pointer"/>
                    </NavLink>
                    {theme === 'light' ? 
                        (
                            <FiMoon className="text-gray-800 cursor-pointer"
                                onClick={() => toogleTheme()}
                            />
                        )
                    :
                        (
                            <IoSunnyOutline className="text-orange-500 cursor-pointer"
                                onClick={() => toogleTheme()}
                            />
                        )
                    }
                    
                    <div ref={triggerRef} onClick={() => {
                        if(!show) {
                            return setShow(true)
                        }
                        return setShow(false)
                    }} className="w-7 h-7 hidden lg:flex justify-center items-center text-xs font-medium text-gray-100 text-center bg-orange-600 rounded-full cursor-pointer">
                        <img
                            src={
                            "https://images.unsplash.com/photo-1772371272141-0fbd644b65c4?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                            }
                            alt="User Avatar"
                            className="w-7 h-7 rounded-full object-cover border border-slate-200"
                        />
                    </div>
                    <FaBars className="flex lg:hidden font-semibold"/>
                </div>
                { show && <ModalIcon session={session} onClose={() => setShow(false)} onLogout={onLogout} excludeRef={triggerRef}/>}
            </div>
        </header>
    </>
  )
}

export default Attendee