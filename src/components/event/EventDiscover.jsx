import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";

function EventDiscover({type, title, date, hour, at, participant, slot, pict}) {
    const percentage = (participant / slot) * 100;
  return (
    <>
      <article className="border border-gray-100 shadow-xl rounded-xl ">
        <div className="relative">
            <img src={pict} alt={title} className="rounded-tl-xl rounded-tr-xl"/>
            <div className="flex absolute left-2 bottom-2 gap-2">
                {type.map(val => <span key={val} className="px-3 py-1 text-xs text-amber-500 bg-white/10 border border-gray-400 rounded-full">{val}</span>)}
            </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
            <p className="text-md text-gray-900 font-medium">{title}</p>
            <div className="flex flex-col gap-1 text-sm text-gray-400">
                <div className="flex gap-2 items-center">
                    <CiCalendar/>
                    <span className="flex gap-1 items-center text-xs">{date} <span className="text-[8px]">●</span>{hour}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <IoLocationOutline/>
                    <span className="text-xs">{at}</span>
                </div>
                <div className="flex gap-2 items-center">
                    <IoPeopleOutline/>
                    <span className="text-xs">{participant} / {slot} attendees</span>
                </div>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex justify-between items-center">
                    <span className="text-xs">{participant} attendees</span>
                    <span className="text-xs">{slot} capacity</span>
                </div>
                <div className={`w-full relative h-2 rounded-full bg-gray-200 before:content-[''] before:absolute before:w-(--progress) before:h-2 before:bg-gray-400 before:rounded-full`} style={{ "--progress": `${percentage}%` }}></div>
            </div>
            <div className="w-full flex gap-2">
                <span className="w-full h-8 text-xs flex justify-center items-center bg-orange-600 rounded-lg text-gray-100 font-medium cursor-pointer">Join Event</span>
                <div className="w-9 flex justify-center items-center border border-gray-200 text-gray-500 rounded-md cursor-pointer"><IoBookmarkOutline/></div>
            </div>
        </div>
      </article>
    </>
  )
}

export default EventDiscover