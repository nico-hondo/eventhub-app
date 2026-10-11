// import { useEffect, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router";

import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate } from '../../../components/utils/utilitas';
import { useSelector } from "react-redux";
import { selectSession, selectUser } from "../../auth/store/authSelectors";

function SavedEvent() {
  const session = useSelector(selectSession);
    const users = useSelector(selectUser);
  
    const user = users.filter((val) => val.email === session?.email);
  
    // guard: session/user belum siap (misal persist belum rehydrate) -> jangan lanjut proses
    if (!session?.email || user.length === 0) {
      return null; // atau tampilin loading skeleton
    }
    
    const savedEventIds = user[0]?.saved_events_id ?? [];
    const savedData = events.filter((val) => savedEventIds.includes(val.id));
  
  // Kalau belum login
    if (!session) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">Please login to see your saved events</p>
                <Link to="/login" className="text-orange-600 underline">Go to Login</Link>
            </div>
        )
    }

  return (
    <>

      {savedData.length === 0 ?
          (<section className="w-full min-h-100 flex justify-center items-center py-6">
            <div className="max-w-3xl flex-1 flex flex-col justify-center items-center gap-6">
              <IoBookmark className="text-gray-900 text-4xl"/>
              <div className="flex flex-col text-xs gap-1 text-center">
                <p className="text-gray-800 font-medium">No Saved Events</p>
                <p className="text-gray-400">Bookmark events you're interested in.</p>
              </div>
              <span className="px-6 py-2.5 text-xs text-gray-200 font-medium bg-orange-600 rounded-lg cursor-pointer">Explore Events</span>
            </div>
          </section>)
        : 
         (
          <div className="grid grid-rows-2 grid-cols-3 gap-5">

          {savedData.map((val) => {
            return(
              <EventDiscover 
                key={`${val.id}-${val.email}`}
                id={val.id}
                type={val.tags}
                title={val.title}
                date={convertDate(val.date)}
                hour={val.start_time}
                at={val.location}
                participant={val.attendees_count}
                slot={val.capacity}
                pict={val.image_url}
              
              />
            )
          })}
          </div>
        )
      }
    
    </>
  )
}

export default SavedEvent