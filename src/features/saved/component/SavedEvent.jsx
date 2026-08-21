import { useEffect, useState } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router";

// import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate } from '../../../components/utils/utilitas';

function SavedEvent() {
  const [userBookmark, setUserBookmark] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const session = localStorage.getItem('session');
    if(!session){
      // setCurrentUser(null);
      return
    }
    const dataSesi = JSON.parse(session);
    setCurrentUser(dataSesi);

    const currentBookEvent = JSON.parse(localStorage.getItem('bookEvent')) || [];

    const bookEvent = currentBookEvent.filter(ev => ev.email === dataSesi.email);

    setUserBookmark(bookEvent);
  }, [])
  
  // Kalau belum login
    if (!currentUser) {
        return (
            <div className="text-center py-10">
                <p className="text-gray-500">Please login to see your saved events</p>
                <Link to="/login" className="text-orange-600 underline">Go to Login</Link>
            </div>
        )
    }

  return (
    <>

      {userBookmark.length === 0 ?
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

          {userBookmark.map((val) => {
            return(
              <EventDiscover 
                key={`${val.id}-${val.email}`}
                id={val.id}
                type={val.tags}
                title={val.title}
                date={convertDate(val.date)}
                hour={val.hour}
                at={val.at}
                participant={val.participant}
                slot={val.slot}
                pict={val.pict}
              
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