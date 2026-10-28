// import { useState, useMemo } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router";

// import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
// import events from '../../../data/events.json';
import { convertDate, convertHour } from '../../../components/utils/utilitas';
import { useSelector } from "react-redux";
import { selectSession} from "../../auth/store/authSelectors";

function UpcomingEvent() {

  const session = useSelector(selectSession);
  // const users = useSelector(selectUser);
  
  // const user = users.filter((val) => val.email === session?.email);
  
  const {myEvents} = useSelector((state) => state.events) || [];
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

      {myEvents.length === 0 ?
          (<section className="w-full min-h-100 flex justify-center items-center py-6">
            <div className="max-w-3xl flex-1 flex flex-col justify-center items-center gap-6">
              <IoBookmark className="text-gray-900 text-4xl"/>
              <div className="flex flex-col text-xs gap-1 text-center">
                <p className="text-gray-800 font-medium">No Joined Events</p>
              </div>
              <span className="px-6 py-2.5 text-xs text-gray-200 font-medium bg-orange-600 rounded-lg cursor-pointer">Explore Events</span>
            </div>
          </section>)
        : 
         (
          <>
            <div className="flex flex-col gap-4">
              <div className="grid grid-cols-3 gap-5">
                {myEvents.map((val) => {
                  return(
                    <EventDiscover 
                      key={`${val.id}-${val.email}`}
                      id={val.id}
                      type={val.category}
                      title={val.title}
                      date={convertDate(val.start_time)}
                      hour={convertHour(val.start_time)}
                      at={val.location}
                      participant={val.total_participants}
                      slot={val.max_participants}
                      pict={val.image_url}
                    
                    />
                  )
                })}
              </div>
            </div>
          </>
        )
      }
    
    </>
  )
}

export default UpcomingEvent