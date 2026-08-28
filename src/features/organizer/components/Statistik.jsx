import { IoCalendarClearOutline } from "react-icons/io5";
import { FiUsers } from "react-icons/fi";
import { LuChartNoAxesCombined } from "react-icons/lu";
import { IoEyeOutline } from "react-icons/io5";

function Statistik() {
  return (
    <>
        <div className="grid grid-cols-4 gap-2">
                    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-lg">
                        <div className="flex justify-between text-xs text-gray-500 ">
                            <span className="uppercase font-medium">Total Events</span>
                            <IoCalendarClearOutline/>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-lg text-gray-900 font-bold">2</span>
                            <span className="text-xs text-gray-400">All Time</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-lg">
                        <div className="flex justify-between text-xs text-gray-500 ">
                            <span className="uppercase font-medium">Total Attendees</span>
                            <FiUsers/>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-lg text-gray-900 font-bold">103</span>
                            <span className="text-xs text-gray-400">Across all events</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-lg">
                        <div className="flex justify-between text-xs text-gray-500 ">
                            <span className="uppercase font-medium">avg fill rate</span>
                            <LuChartNoAxesCombined/>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-lg text-gray-900 font-bold">57%</span>
                            <span className="text-xs text-gray-400">Capacity utilization</span>
                        </div>
                    </div>
                    <div className="flex flex-col gap-4 p-4 border border-gray-200 bg-white rounded-lg">
                        <div className="flex justify-between text-xs text-gray-500 ">
                            <span className="uppercase font-medium">Event views</span>
                            <IoEyeOutline/>
                        </div>
                        <div className="grid gap-1">
                            <span className="text-lg text-gray-900 font-bold">3241</span>
                            <span className="text-xs text-gray-400">Last 30 days</span>
                        </div>
                    </div>
                </div>
    </>
  )
}

export default Statistik