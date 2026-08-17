import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoTimeOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { convertDate } from "../../../components/utils/utilitas";
import { IoShareSocialOutline } from "react-icons/io5";

function DetailContent({data}) {
    const percentage = (data.attendees_count / data.capacity) * 100;

    const sisaSlot = data.capacity - data.attendees_count
  return (
    <section className="w-full flex justify-center items-center py-8">
        <div className="max-w-5xl flex-1 flex gap-8">
            <div className="flex-3 flex flex-col gap-6">
                <img src={data.image_url} alt={data.title} className="w-150 h-60 object-cover rounded-2xl"/>
                <div className="flex gap-2">
                    {data.tags.map((val) => {
                        return(
                            <span key={val} className="text-[12px] text-blue-700 rounded-full bg-blue-600/20 px-3 py-0.5">{val}</span>
                        )
                    })}    
                </div>
                <h2 className="text-3xl text-gray-800 font-medium">{data.title}</h2>

                <div className="flex flex-col gap-1">
                    <span className="text-md font-medium text-gray-900">About this event</span>
                    <p className="text-gray-400 text-xs leading-5">{data.description}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-md font-medium text-gray-900">Speakers</span>
                    <div className="flex gap-2">
                        {data.speakers.map((val) => {
                            return(
                                <div className="flex px-4 py-2 gap-2 bg-white border border-gray-200 rounded-lg">
                                    <img src={val.avatar_url} alt={val.name} className="w-8 h-8 object-cover rounded-full"/>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-medium text-gray-800 leading-2">{val.name}</span>
                                        <span className="text-[12px] text-gray-400">{val.role}</span>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <div className="flex-1 flex flex-col gap-6">
                <div className="flex flex-col gap-3 p-4 border border-gray-200 bg-white rounded-lg">
                    <div className="flex flex-col gap-2 border-b border-gray-200 py-2">
                        <span className="uppercase text-gray-400 text-xs font-medium mb-1">event info</span>
                        <div className="flex gap-2 items-center text-xs text-gray-800 font-medium"><CiCalendar/>{convertDate(data.date)}</div>
                        <div className="flex gap-2 items-center text-xs text-gray-800 font-medium"><IoTimeOutline/>{data.start_time} - {data.end_time}</div>
                        <div className="flex gap-2 items-center text-xs text-gray-800 font-medium"><IoLocationOutline/>{data.location}</div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2 text-xs font-medium text-gray-900">
                            <IoPeopleOutline/>
                            {percentage}% full <span className="text-[8px]">●</span> {sisaSlot} spots left
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-between items-center">
                                <span className="text-xs">{data.attendees_count} attendees</span>
                                <span className="text-xs">{data.capacity} capacity</span>
                            </div>
                            <div className={`w-full relative h-2 rounded-full bg-gray-200 before:content-[''] before:absolute before:w-(--progress) before:h-2 ${sisaSlot === 0 ? "before:bg-red-600" : percentage <= 50 ? "before:bg-green-600" : "before:bg-yellow-500"} before:rounded-full`} style={{ "--progress": `${percentage}%` }}></div>
                        </div>
                        <span className={`w-full h-8 flex justify-center items-center ${sisaSlot === 0 ? "bg-white border border-gray-300 text-gray-400" : "bg-orange-600"} text-xs text-gray-100 font-medium cursor-pointer rounded-lg`}>
                            Join Event
                        </span>
                        <div className="flex gap-2">
                            <span className="w-full h-8 flex justify-center items-center gap-1 text-xs text-gray-800 font-medium border border-gray-200 rounded-lg cursor-pointer"><IoBookmarkOutline/> Save</span>
                            <span className="w-full h-8 flex justify-center items-center gap-1 text-xs text-gray-800 font-medium border border-gray-200 rounded-lg cursor-pointer"><IoShareSocialOutline/> Share</span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col p-4 gap-3 border border-gray-200 bg-white rounded-lg">
                    <p className="uppercase text-xs text-gray-500 font-medium">organized by</p>
                    <div className="flex items-center gap-2">
                        <img src={data.organizer.avatar_url} alt={data.organizer.name} className="w-7 h-7 object-cover rounded-full"/>
                        <div className="flex flex-col">
                            <span className="text-xs text-gray-800 font-medium leading-3">{data.organizer.name}</span>
                            <span className="text-[12px] text-blue-800">{data.organizer.role}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </section>
  )
}

export default DetailContent