import { FaArrowLeftLong } from "react-icons/fa6";
import { Link, Outlet } from "react-router/internal/react-server-client";
import { IoCheckmark } from "react-icons/io5";

function CreateEvent() {
  return (
    <main className="w-full flex flex-col gap-4 justify-center items-center">
        <section className="w-full h-10 flex justify-center bg-white border-b border-gray-200 sticky top-15">
            <div className="max-w-4xl flex-1 flex justify-between items-center">
                <div className="flex gap-4 items-center">
                    <Link to="/dashboard"> 
                        <span className="flex items-center gap-2 text-xs text-gray-400 cursor-pointer"><FaArrowLeftLong/> Back</span>
                    </Link>
                    <h2 className="text-md text-gray-900 font-medium">Create Event</h2>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-4 h-4 flex justify-center items-center text-center rounded-full text-[11px] bg-orange-600 text-white"><IoCheckmark/></div>
                    <div className="w-6 h-0.5 bg-orange-700 rounded-lg"></div>
                    <div className="w-4 h-4 flex justify-center items-center font-medium text-center rounded-full text-[11px] bg-orange-600 text-gray-100">2</div>
                    <div className="w-6 h-0.5 bg-gray-400 rounded-lg"></div>
                    <div className="w-4 h-4 flex justify-center items-center text-center rounded-full text-[11px] bg-gray-300 text-gray-700">3</div>
                </div>
            </div>
        </section>
        <Outlet/>
    </main>
  )
}

export default CreateEvent