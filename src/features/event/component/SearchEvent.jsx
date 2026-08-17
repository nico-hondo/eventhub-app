import { BsFillSearchHeartFill } from "react-icons/bs";
import { IoFilterSharp } from "react-icons/io5";

function SearchEvent() {
    return (
        <section className="flex justify-between gap-3 sticky top-14 z-40 px-7 py-4 bg-white border border-gray-200">
            <form className="w-full flex gap-4 items-center relative">
                <BsFillSearchHeartFill className="absolute inset-y-2.5 left-3 text-md font-bold text-gray-600"/>
                <input type="text" className="w-full h-10 bg-gray-100 rounded-lg px-10 text-sm text-gray-800 focus:outline-none" placeholder="Search events"></input>
            </form>
            <span className="flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-lg text-sm text-gray-600 font-medium cursor-pointer">
                <IoFilterSharp/>
                Filters
            </span>
        </section>
    )
}

export default SearchEvent