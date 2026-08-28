import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";

function SearchEvent({theme}) {
    return (
        <section className={`flex justify-between gap-3 sticky top-14 z-40 px-7 py-4 ${theme === 'light' ? 'bg-white  border-gray-200' : 'bg-black  border-gray-900'} border-b`}>
            <form className="w-full flex gap-4 items-center relative">
                <BsFillSearchHeartFill className={`absolute inset-y-2.5 left-3 text-md font-bold ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}/>
                <input type="text" className={`w-full h-10 ${theme === 'light' ? 'bg-gray-100 text-gray-800' : 'bg-gray-900 text-gray-300'} rounded-lg px-10 text-sm focus:outline-none`} placeholder="Search events"></input>
            </form>
            <span className={`flex items-center gap-2 px-4 py-1.5 border ${theme === 'light' ? 'border-gray-300 text-gray-600' : 'border-gray-600 text-gray-300'} rounded-lg text-xs font-medium cursor-pointer`}>
                <IoFilterSharp/>
                Filters
            </span>
        </section>
    )
}

export default SearchEvent