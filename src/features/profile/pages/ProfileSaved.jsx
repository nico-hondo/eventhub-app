import { IoBookmark } from "react-icons/io5";

import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate, convertHour } from '../../../components/utils/utilitas';
import { useSelector } from "react-redux";
import { selectSession} from "../../auth/store/authSelectors";

function ProfileSaved() {
  const {saved_events} = useSelector((state) => state.events);
  console.log(saved_events);
  const session = useSelector(selectSession);

  // guard: session/user belum siap (misal persist belum rehydrate) -> jangan lanjut proses
  if (!session?.email) {
    return null; // atau tampilin loading skeleton
  }

  return (
    <>
      {saved_events.length === 0 ?
          (<section className="w-full min-h-100 flex justify-center items-center pt-2">
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
          <section className="grid grid-cols-3 gap-4">

          {saved_events.map((val) => {
            return(
              <EventDiscover 
                key={val.event_id}
                id={val.event_id}
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
          </section>
        )
      }
    
    </>
  )
}

export default ProfileSaved