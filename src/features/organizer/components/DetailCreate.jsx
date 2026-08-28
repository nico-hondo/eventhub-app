import { useState } from "react";
import { Link } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";

function DetailCreate() {
    const [format, setFormat] = useState("inPerson");
    console.log(format)
  return (
    <>
        <section className="w-full flex justify-center pt-2 pb-4">
            <div className="max-w-4xl flex-1 flex flex-col gap-6">
                <div className="block">
                    <h3 className="text-lg font-semibold text-gray-900">Date, Location & Capacity</h3>
                    <p className="text-gray-500 text-xs">When and Where is your event?.</p>
                </div>
                <form className="flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                        <label htmlFor="date" className="text-xs font-medium text-gray-700">Event Date</label>
                        <input id="date" type="date" name="date" className="w-full h-10 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 px-4"/>
                    </div>
                    <div className="w-full flex items-center gap-2">
                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="start" className="text-xs font-medium text-gray-700">Start Time</label>
                            <input id="start" type="time" name="start" className="w-full h-10 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 px-4"/>
                        </div>
                        <div className="flex-1 flex flex-col gap-2">
                            <label htmlFor="end" className="text-xs font-medium text-gray-700">End Time</label>
                            <input id="end" type="time" name="end" className="w-full h-10 bg-white border border-gray-200 rounded-lg text-xs text-gray-600 px-4"/>
                        </div>
                    </div>
                    <label htmlFor="start" className="text-xs font-medium text-gray-700 leading-1">Event Format</label>
                    <div className="flex gap-2 p-1 bg-gray-100 rounded-lg w-fit">
                        <input 
                            type="radio" 
                            name="eventFormat" 
                            value="inPerson" 
                            id="inPerson" 
                            // checked={format === "inPerson"}
                            onChange={() => setFormat("inPerson")}
                            className="sr-only peer"
                        />
                        <label 
                            htmlFor="inPerson" 
                            className="px-4 py-1.5 text-xs rounded-md cursor-pointer 
                            peer-checked:bg-white peer-checked:shadow peer-checked:text-gray-900 
                            text-gray-600"
                        >
                            📍 In Person
                        </label>
                        <input 
                            type="radio" 
                            name="eventFormat" 
                            value="online" 
                            id="online" 
                            // checked={format === "online"}
                            onChange={() => setFormat("online")}
                            className="sr-only peer"
                        />
                        <label 
                            htmlFor="online" 
                            className="px-4 py-1.5 text-xs rounded-md cursor-pointer
                            peer-checked:bg-white peer-checked:shadow peer-checked:text-gray-900 
                            text-gray-600"
                        >
                            💻 Online
                        </label>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="loc" className="font-medium text-gray-700 text-xs">Location</label>
                        <input type="text" id="loc" placeholder="Bandung, West Java" name="location" className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-white text-xs"/>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="slot" className="font-medium text-gray-700 text-xs">Capacity</label>
                        <input type="text" id="slot" placeholder="100" name="slot" className="w-full h-10 px-4 border border-gray-200 rounded-lg bg-white text-xs"/>
                    </div>
                </form>
                <div className="w-full h- bg-gray-200 rounded-lg"></div>
                <div className="w-full flex justify-between items-center">
                    <button className="w-20 h-8 flex gap-2 justify-center items-center text-xs text-gray-700 font-medium border border-gray-200 rounded-lg cursor-pointer"><IoIosArrowRoundForward className="text-md rotate-180 text-lg"/> Back</button>
                    <Link to="/dashboard/create-event/review">
                        <button className="w-28 h-8 flex gap-2 justify-center items-center text-xs text-gray-100 font-medium bg-orange-600 rounded-lg cursor-pointer">Continue <IoIosArrowRoundForward className="text-lg"/></button>
                    </Link>
                </div>
            </div>
        </section>
    </>
  )
}

export default DetailCreate