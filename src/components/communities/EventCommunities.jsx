import { CiCalendar } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

function EventCommunities({title, desc, type, member, agenda, pict}) {
  return (
    <>
      <article className="border border-gray-100 shadow-xl rounded-xl">
        <img src={pict} alt={title} className="w-full h-40 object-cover rounded-tl-xl rounded-tr-xl"/>
        <div className="grid grid-rows-7 gap-2 p-4">
            <p className="text-md text-gray-900 font-medium">{title}</p>
            <p className="row-span-2 text-xs text-gray-400 flex-1">{desc}</p>
            <div className="flex gap-2">
                {type.map((val) => <span key={val} className="px-3 py-1 text-xs text-amber-500 bg-white/10 border border-gray-400 rounded-full">{val}</span>)}
            </div>
            <div className="flex text-xs text-gray-400 gap-4">
                <div className="flex items-center gap-1">
                    <IoPeopleOutline/>
                    <span>{member} members</span>
                </div>
                <div className="flex items-center gap-1">
                    <CiCalendar/>
                    <span>{agenda} upcoming</span>
                </div>
            </div>
            <span className="row-span-2 w-full h-8 text-xs flex justify-center items-center bg-orange-600 rounded-lg text-gray-100 font-medium cursor-pointer">Join Event</span>
        </div>
      </article>
    </>
  )
}

export default EventCommunities