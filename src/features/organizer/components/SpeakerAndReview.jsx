import { GiCrossedSabres } from "react-icons/gi";
import { Link } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

function SpeakerAndReview() {
  return (
    <section className="w-full flex justify-center pt-2 pb-4">
        <div className="max-w-4xl flex-1 flex flex-col gap-6">
            <div className="block">
                <h3 className="text-lg font-semibold text-gray-900">Speakers & Review</h3>
                <p className="text-gray-500 text-xs">Add Speakers and confirm your event details.</p>
            </div>
            <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label htmlFor="speaker" className="text-xs font-medium text-gray-700">Speakers(optional)</label>
                    <div className="flex gap-2">
                        <input type="text" className="px-4 w-full h-8 text-xs border border-gray-300 rounded-md bg-white focus:outline-none" placeholder="Speaker name"/>
                        <button className="w-15 h-8 flex justify-center items-center text-gray-600 text-xs border border-gray-300 rounded-md bg-white cursor-pointer shadow-xs">Add</button>
                    </div>
                    <div className="flex gap-2">
                        <span className="w-fit flex items-center gap-2 px-4 py-1 bg-gray-100 text-xs text-gray-800 rounded-full cursor-pointer">Abdul <GiCrossedSabres/></span>
                        <span className="w-fit flex items-center gap-2 px-4 py-1 bg-gray-100 text-xs text-gray-800 rounded-full cursor-pointer">Andi <GiCrossedSabres/></span>
                    </div>
                </div>
            </form>
            <div className="w-full flex flex-col bg-white border border-gray-200 rounded-lg px-4 gap-2">
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Title</span>
                    <span className="text-gray-900 font-medium text-xs">Go Concurrency Workshop</span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Category</span>
                    <span className="px-2 py-1 bg-gray-200 text-gray-700 font-mono text-xs rounded-full">Technology</span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Date</span>
                    <span className="text-gray-900 text-xs">2026 - 08 - 12</span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Time</span>
                    <span className="text-gray-900 font-medium text-xs">12:12 - 14:14 WIB </span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Location</span>
                    <span className="text-gray-900 font-medium text-xs">Bandung </span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Capacity</span>
                    <span className="text-gray-900 font-medium text-xs">121 Attendees </span>
                </div>
                <div className="w-full h-10 flex justify-between items-center border-b border-gray-200">
                    <span className="text-xs text-gray-500">Speakers</span>
                    <span className="text-gray-900 font-medium text-xs">2 Added </span>
                </div>
            </div>
            <div className="w-full h-[1px] bg-gray-200 rounded-lg"></div>
            <div className="w-full flex justify-between items-center">
                <button className="w-20 h-8 flex gap-2 justify-center items-center text-xs text-gray-700 font-medium border border-gray-200 rounded-lg cursor-pointer"><IoIosArrowRoundForward className="text-md rotate-180 text-lg"/> Back</button>
                <Link to="/dashboard/create-event/success">
                    <button className="w-28 h-8 flex gap-2 justify-center items-center text-xs text-gray-100 font-medium bg-green-700 rounded-lg cursor-pointer"><IoCheckmark /> Publish Event</button>
                </Link>
            </div>
        </div>
    </section>
  )
}

export default SpeakerAndReview