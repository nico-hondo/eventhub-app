import { NavLink, Link } from "react-router"
import { FiMoon } from "react-icons/fi";

function Guest() {
  return (
    <>
        <header className="w-full sticky top-0 z-50 bg-white border border-gray-200">
            <div className="px-7 py-4 flex justify-between items-center">
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
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-5">
                    <span className="text-gray-400 text-xs">Browsing as guest</span>
                    <FiMoon className="text-gray-800 cursor-pointer"/>
                    <span className="bg-orange-600 text-gray-100 text-xs font-medium rounded-md px-3 py-2 cursor-pointer"><Link to="/auth">Sign In</Link></span>
                </div>
            </div>
        </header>
    </>
  )
}

export default Guest