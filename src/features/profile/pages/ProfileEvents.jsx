import { useContext } from "react";
// import { Link } from "react-router";

// import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import events from '../../../data/events.json';
import { convertDate } from '../../../components/utils/utilitas';
import themeContext from "../../../context/theme/themeContext";
import { useSelector } from "react-redux";
import { selectSession, selectUser } from "../../auth/store/authSelectors";

function ProfileEvents() {

    const {theme} = useContext(themeContext);
    const session = useSelector(selectSession);
    const users = useSelector(selectUser);
  
    const user = users.filter((val) => val.email === session?.email);
  
    // guard: session/user belum siap (misal persist belum rehydrate) -> jangan lanjut proses
    if (!session?.email || user.length === 0) {
      return null; // atau tampilin loading skeleton
    }
    
    const joinedEventIds = user[0]?.events_id ?? [];
    const joinedData = events.filter((val) => joinedEventIds.includes(val.id));
  

  return (
    <>

      {joinedData.length === 0 ?
          (<section className="w-full min-h-100 flex justify-center items-center py-6">
            <div className="max-w-3xl flex-1 flex flex-col justify-center items-center gap-6">
              <div className="flex flex-col text-xs gap-1 text-center">
                <p className={`${theme === 'light' ? 'text-gray-800' : 'text-gray-400'} font-medium`}>No Joined Events</p>
              </div>
              <span className="px-6 py-2.5 text-xs text-gray-200 font-medium bg-orange-600 rounded-lg cursor-pointer">Explore Events</span>
            </div>
          </section>)
        : 
         (
          <>
            <div className="flex flex-col gap-4">
              <span className={`text-xs font-medium uppercase ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>upcoming</span>
              <div className="grid grid-cols-3 gap-5">
                {joinedData.map((val) => {
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

export default ProfileEvents