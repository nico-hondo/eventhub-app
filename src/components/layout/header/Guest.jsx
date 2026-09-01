import { useContext } from "react";
import { NavLink, Link } from "react-router"
import { FiMoon } from "react-icons/fi";
import { IoSunnyOutline } from "react-icons/io5";
import themeContext from "../../../context/theme/themeContext";

function Guest() {
    const {theme, toogleTheme} = useContext(themeContext);
  return (
    <>
        <header className={`w-full sticky top-0 z-50 ${theme === 'light' ? 'bg-white border-gray-200' : 'bg-black border-gray-700'} border-b`}>
            <div className="px-7 py-4 flex justify-between items-center">
                <div className="flex gap-6 items-center"> 
                    <div className="flex gap-2">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-200 bg-orange-500">E</span>
                        <h1 className={`text-lg ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} font-medium`}>EventHub</h1>
                    </div>
                    <nav>
                        <ul className="flex gap-4">
                            <li className=""><NavLink to="/" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Explore</NavLink></li>
                            <li><NavLink to="/events" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Events</NavLink></li>
                            <li><NavLink to="/communities" className={({isActive}) => isActive ? "text-xs font-medium text-orange-500 bg-orange-300/30 px-3 py-1.5 rounded-lg" : `text-xs font-medium ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>Communities</NavLink></li>
                        </ul>
                    </nav>
                </div>
                <div className="flex items-center gap-5">
                    <span className="text-gray-400 text-xs">Browsing as guest</span>
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
                    <Link to="/auth">
                        <span className="bg-orange-600 text-gray-100 text-xs font-medium rounded-md px-3 py-2 cursor-pointer">
                            Sign In
                        </span>
                    </Link>
                </div>
            </div>
        </header>
    </>
  )
}

export default Guest