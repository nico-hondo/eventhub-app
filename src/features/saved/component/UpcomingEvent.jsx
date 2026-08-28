import { useState, useMemo } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router";

// import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import events from '../../../data/events.json';
import { convertDate } from '../../../components/utils/utilitas';

function UpcomingEvent() {

  const session = localStorage.getItem('session');
  const dataSesi = JSON.parse(session);

  const [dataEvent] = useState(() => {
    const joinEvent = localStorage.getItem('joinEvent');
    return joinEvent? JSON.parse(joinEvent) : [];
  })

  // 1. Ambil id event milik user yg login doang
  const userJoinedIds = useMemo(() => {
    return dataEvent
     .filter(ev => String(ev.email) === String(dataSesi.email)) // filter punya user ini
     .map(ev => String(ev.id)) // ambil id nya aja
  }, [dataEvent, dataSesi.email])

  // 2. Join ke data store events.json
  const userJoinEvent = useMemo(() => {
    return events.filter(event => userJoinedIds.includes(String(event.id)))
  }, [userJoinedIds])

  console.log("ID yg dijoin:", userJoinedIds);
  console.log("Data lengkap:", userJoinEvent);

  if(!session){
    return
  }
  
  // Kalau belum login
    if (!dataSesi) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">Please login to see your saved events</p>
                <Link to="/login" className="text-orange-600 underline">Go to Login</Link>
            </div>
        )
    }

  return (
    <>

      {userJoinEvent.length === 0 ?
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
              <div className="grid grid-rows-2 grid-cols-3 gap-5">
                {userJoinEvent.map((val) => {
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
            </div>
          </>
        )
      }
    
    </>
  )
}

export default UpcomingEvent