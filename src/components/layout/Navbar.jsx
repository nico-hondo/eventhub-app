import { NavLink, Link } from "react-router"
import { FiMoon } from "react-icons/fi";

function Navbar() {
  return (
    <>
        <header className="w-full">
            <div className="px-7 py-4 flex justify-between items-center">
                <div className="flex gap-6 items-center"> 
                    <div className="flex gap-2">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-200 bg-orange-500">E</span>
                        <h1 className="text-lg text-gray-800 font-medium">EventHub</h1>
                    </div>
                    <nav>
                        <ul className="flex text-sm font-medium text-gray-600 gap-4">
                            <li className=""><NavLink to="/">Explore</NavLink></li>
                            <li><NavLink to="/events">Events</NavLink></li>
                            <li><NavLink to="/communities">Communities</NavLink></li>
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

export default Navbar