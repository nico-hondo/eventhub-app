import { useState, useRef, useContext } from "react";
import { NavLink } from "react-router"
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import ModalIcon from "../../../features/auth/components/ModalIcon";
import { MdOutlineDashboard } from "react-icons/md";
import themeContext from "../../../context/theme/themeContext";

function Admin({session, onLogout}) {
    const [show, setShow] = useState(false);
    const triggerRef = useRef(null);
    const firstLetter = session.nama.split(' ').map(val => val[0]).join("");

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
                            <nav>
                                <ul className="flex gap-4">
                                    <li className=""><NavLink to="/" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Explore</NavLink></li>
                                    <li><NavLink to="/events" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Events</NavLink></li>
                                    <li><NavLink to="/communities" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Communities</NavLink></li>
                                    <li><NavLink to="/my-events" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>My Events</NavLink></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="flex items-center gap-5">
                            <NavLink to="organizer" className={({isActive}) => isActive ? "w-25 h-6 text-orange-500 bg-orange-100 flex justify-center items-center gap-2 rounded-lg" : `w-25 h-6 justify-center items-center ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'} flex gap-2 hover:text-orange-500`}>
                                <MdOutlineDashboard className="text-md cursor-pointer"/>
                                <span className="text-xs">Admin</span>
                            </NavLink>
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
                            }} className="w-7 h-7 flex justify-center items-center text-xs font-medium text-gray-100 text-center bg-orange-600 rounded-full cursor-pointer">
                                <span>{firstLetter}</span>
                            </div>
                        </div>
                        { show && <ModalIcon session={session} onClose={() => setShow(false)} onLogout={onLogout} excludeRef={triggerRef}/>}
                    </div>
                </header>
    </>
  )
}

export default Admin