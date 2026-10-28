import { useEffect } from "react";
import { IoBookmark } from "react-icons/io5";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate, convertHour } from '../../../components/utils/utilitas';
import { selectSession, selectUser } from "../../auth/store/authSelectors";
import { fetchSavedEvents } from "../../../redux/slices/eventSlice"; // Sesuaikan path slice event kamu

function SavedEvent() {
  const dispatch = useDispatch();
  const session = useSelector(selectSession);
  const users = useSelector(selectUser) || [];
  
  const { saved_events = [] } = useSelector((state) => state.events) || {};

  // Fetch data saved events saat komponen di-mount jika user sudah login
  useEffect(() => {
    if (session) {
      dispatch(fetchSavedEvents());
    }
  }, [dispatch, session]);

  // 1. Tampilan jika user belum login sama sekali
  if (!session) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">Please login to see your saved events</p>
        <Link to="/login" className="text-orange-600 underline">Go to Login</Link>
      </div>
    );
  }

  // 2. Guard: jika session ada tetapi data users belum ter-rehydrate dari storage
  const currentUser = users.find((val) => val.email === session?.email);
  if (!currentUser && users.length > 0) {
    return null; // Atau render loading spinner/skeleton
  }

  return (
    <>
      {saved_events.length === 0 ? (
        <section className="w-full min-h-100 flex justify-center items-center py-6">
          <div className="max-w-3xl flex-1 flex flex-col justify-center items-center gap-6">
            <IoBookmark className="text-gray-900 text-4xl" />
            <div className="flex flex-col text-xs gap-1 text-center">
              <p className="text-gray-800 font-medium">No Saved Events</p>
              <p className="text-gray-400">Bookmark events you're interested in.</p>
            </div>
            <Link to="/events" className="px-6 py-2.5 text-xs text-white font-medium bg-orange-600 rounded-lg cursor-pointer">
              Explore Events
            </Link>
          </div>
        </section>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {saved_events.map((val) => (
            <EventDiscover
              key={`${val.user_id}-${val.event_id}`} // Perbaikan key unik
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
          ))}
        </div>
      )}
    </>
  );
}

export default SavedEvent;