import { CiCalendar } from "react-icons/ci";
import { 
  IoLocationOutline, 
  IoTimeOutline, 
  IoShareSocialOutline, 
  IoPeopleOutline, 
  IoBookmarkOutline, 
  IoCheckmark, 
  IoBookmark 
} from "react-icons/io5";
import { convertDate, convertHour } from "../../../components/utils/utilitas";
import { FiX } from "react-icons/fi";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { selectSession, selectRole } from "../../auth/store/authSelectors";
import { useDispatch, useSelector } from "react-redux";
import { useContext, useState } from "react";
import themeContext from "../../../context/theme/themeContext";
import { useNavigate } from "react-router";
import { joinEventThunk } from "../../../redux/slices/registerSlice";
import { toast } from "react-toastify";
import { fetchMyEvents, fetchSavedEvents, saveEventThunk } from "../../../redux/slices/eventSlice";

function DetailContent({ data }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { theme } = useContext(themeContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Kalkulasi Peserta & Slot
  const totalParticipants = data?.total_participants || 0;
  const maxParticipants = data?.max_participants || 1;
  const percentage = Math.round((totalParticipants / maxParticipants) * 100);
  const sisaSlot = maxParticipants - totalParticipants;

  // Selectors Auth & Events
  const session = useSelector(selectSession);
  const role = useSelector(selectRole);

  const { myEvents = [] } = useSelector((state) => state.events) || {};
  const { saved_events = [] } = useSelector((state) => state.events) || {};

  // Pengecekan status Joined dan Saved (Mendukung properti 'id' atau 'event_id')
  const isJoined = myEvents.some((item) => (item.id || item.event_id) === data.id);
  const isSaved = saved_events.some((item) => (item.event_id || item.id) === data.id);

  // Handle Join / Unjoin Event
  const handleJoin = async () => {
    if (!session) {
      setIsModalOpen(true);
      return; // <-- Diperbaiki: Harus return agar API tidak dipanggil saat belum login
    }

    if (role === "organizer" || role === "admin") return;

    const dataJoin = {
      eventId: data.id,
      userId: session.id,
    };

    const waitPromise = dispatch(joinEventThunk(dataJoin)).unwrap();

    toast.promise(
      waitPromise,
      {
        pending: isJoined ? "Unjoining Event..." : "Joining Event...",
        success: isJoined ? "Unjoin Event Successful" : "Join Event Successful",
        error: isJoined ? "Unjoin event failed" : "Join event failed",
      },
      { position: "top-right", autoClose: 900 }
    );

    try {
      await waitPromise;
      dispatch(fetchMyEvents());
    } catch (error) {
      console.error("error joining event: ", error);
    }
  };

  // Handle Bookmark / Save Event
  const handleBookmark = async () => {
    if (!session) {
      setIsModalOpen(true);
      return; // <-- Diperbaiki: Harus return agar API tidak dipanggil
    }

    if (role === "organizer" || role === "admin") return;

    const dataSave = {
      eventId: data.id,
      userId: session.id,
    };

    const waitPromise = dispatch(saveEventThunk(dataSave)).unwrap();

    toast.promise(
      waitPromise,
      {
        pending: isSaved ? "Removing from saved events..." : "Saving Event...",
        success: isSaved ? "Event removed from saved" : "Save Event Successfully",
        error: isSaved ? "Failed to remove event" : "Save event failed",
      },
      { position: "top-right", autoClose: 900 }
    );

    try {
      await waitPromise;
      dispatch(fetchSavedEvents());
    } catch (error) {
      console.error("error saving event: ", error);
    }
  };

  const handleSignIn = () => {
    navigate("/auth");
  };

  return (
    <>
      <section className="w-full flex justify-center items-center py-8">
        <div className="max-w-5xl flex-1 flex flex-col md:flex-row gap-8 px-4">
          
          {/* Kolom Kiri: Detail Utama Event */}
          <div className="flex-3 flex flex-col gap-6">
            <img
              src={data.image_url}
              alt={data.title}
              className="w-full h-64 md:h-80 object-cover rounded-2xl"
            />
            
            <div className="flex gap-2">
              <span className="text-xs text-blue-700 font-medium rounded-full bg-blue-100 px-3 py-1">
                {data.category}
              </span>
            </div>

            <h2 className="text-3xl text-gray-800 font-semibold">{data.title}</h2>

            <div className="flex flex-col gap-1">
              <span className="text-md font-medium text-gray-900">About this event</span>
              <p className="text-gray-500 text-xs leading-relaxed">{data.description}</p>
            </div>

            {/* List Speakers */}
            {data.speakers && data.speakers.length > 0 && (
              <div className="flex flex-col gap-2">
                <span className="text-md font-medium text-gray-900">Speakers</span>
                <div className="flex flex-wrap gap-3">
                  {data.speakers.map((val, idx) => (
                    <div
                      key={val.id || idx}
                      className="flex items-center px-4 py-2.5 gap-3 bg-white border border-gray-200 rounded-lg shadow-sm"
                    >
                      <img
                        src={val?.avatar_url || "https://images.unsplash.com/photo-1740252117027-4275d3f84385?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                        }
                        alt={val.name}
                        className="w-9 h-9 object-cover rounded-full"
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold text-gray-800">
                          {val.name}
                        </span>
                        <span className="text-[11px] text-gray-400">{val.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Kolom Kanan: Info & Action Card */}
          <div className="flex-1 flex flex-col gap-6">
            <div className="flex flex-col gap-4 p-5 border border-gray-200 bg-white rounded-xl shadow-sm">
              
              {/* Event Metadata */}
              <div className="flex flex-col gap-2.5 border-b border-gray-100 pb-4">
                <span className="uppercase text-gray-400 text-[11px] font-bold tracking-wider">
                  EVENT INFO
                </span>
                <div className="flex gap-2 items-center text-xs text-gray-800 font-medium">
                  <CiCalendar size={16} />
                  {convertDate(data.start_time)}
                </div>
                <div className="flex gap-2 items-center text-xs text-gray-800 font-medium">
                  <IoTimeOutline size={16} />
                  {convertHour(data.start_time)} - {convertHour(data.end_time)}
                </div>
                <div className="flex gap-2 items-center text-xs text-gray-800 font-medium">
                  <IoLocationOutline size={16} />
                  {data.location}
                </div>
              </div>

              {/* Attendance Progress & Controls */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-900">
                  <IoPeopleOutline size={16} />
                  <span>{percentage}% full</span>
                  <span className="text-[8px] mx-1">●</span>
                  <span>{sisaSlot <= 0 ? "Full Booked" : `${sisaSlot} spots left`}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-center text-[11px] text-gray-500">
                    <span>{totalParticipants} attendees</span>
                    <span>{maxParticipants} capacity</span>
                  </div>
                  <div className="w-full relative h-2 rounded-full bg-gray-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        sisaSlot <= 0
                          ? "bg-red-600"
                          : percentage <= 50
                          ? "bg-green-600"
                          : "bg-yellow-500"
                      }`}
                      style={{ width: `${Math.min(percentage, 100)}%` }}
                    />
                  </div>
                </div>

                {isJoined ? (
                  <button
                    className="w-full h-9 text-xs flex justify-center items-center gap-1 bg-green-600 hover:bg-green-700 rounded-lg text-white font-medium cursor-pointer transition-colors"
                    onClick={handleJoin}
                    disabled={role === "organizer" || role === "admin"}
                  >
                    <IoCheckmark size={16} />
                    <span>Registered</span>
                  </button>
                ) : (
                  <button
                    className={`w-full h-9 text-xs flex justify-center items-center rounded-lg font-medium transition-colors cursor-pointer ${
                      role === "organizer" || role === "admin"
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-orange-600 hover:bg-orange-500 text-white"
                    }`}
                    onClick={handleJoin}
                    disabled={role === "organizer" || role === "admin"}
                  >
                    Join Event
                  </button>
                )}

                <div className="flex gap-2">
                  <button
                    className={`flex-1 h-9 flex justify-center items-center border rounded-lg transition-colors cursor-pointer ${
                      isSaved
                        ? "border-orange-500 text-orange-500"
                        : theme === "light"
                        ? "bg-white border-gray-200 text-gray-600 hover:border-orange-500 hover:text-orange-500"
                        : "bg-gray-800 border-gray-700 text-gray-300 hover:border-orange-500"
                    }`}
                    onClick={handleBookmark}
                    disabled={role === "organizer" || role === "admin"}
                    title={isSaved ? "Unsave event" : "Save event"}
                  >
                    {isSaved ? <IoBookmark size={16} /> : <IoBookmarkOutline size={16} />}
                  </button>

                  <button className="flex-1 h-9 flex justify-center items-center gap-1.5 text-xs text-gray-700 font-medium border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer hover:border-green-500 hover:text-green-500">
                    <IoShareSocialOutline size={16} />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>

            {data.organizer && (
              <div className="flex flex-col p-4 gap-3 border border-gray-200 bg-white rounded-xl shadow-sm">
                <p className="uppercase text-[11px] text-gray-400 font-bold tracking-wider">
                  ORGANIZED BY
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={data.organizer?.avatar_url || 
                    "https://images.unsplash.com/photo-1740252117013-4fb21771e7ca?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=NHwxMjA3fDA%3D"
                    }
                    alt={data.organizer.name}
                    className="w-8 h-8 object-cover rounded-full"
                  />
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-800 font-semibold">
                      {data.organizer.name}
                    </span>
                    <span className="text-[11px] text-blue-600">{data.organizer.role}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </section>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          />

          <div
            className={`relative w-full max-w-md rounded-2xl shadow-2xl p-6 ${
              theme === "light" ? "bg-white" : "bg-gray-900"
            }`}
          >
            <div className="flex justify-between items-center mb-4">
              <h3
                className={`text-base font-bold ${
                  theme === "light" ? "text-gray-900" : "text-gray-100"
                }`}
              >
                Sign in to Continue
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 cursor-pointer p-1"
              >
                <FiX size={18} />
              </button>
            </div>

            <div className="py-4 flex flex-col gap-3 justify-center items-center text-center">
              <div className="p-3 bg-orange-100 rounded-full text-orange-600">
                <BsFillTicketPerforatedFill size={24} />
              </div>
              <p className="text-xs text-gray-500 leading-relaxed px-2">
                Create a free account to register for events, save favourites, join communities, and get personalised recommendations.
              </p>
            </div>

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className={`px-4 py-2 text-xs rounded-lg font-medium cursor-pointer transition-colors ${
                  theme === "light"
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                }`}
              >
                Keep Browsing
              </button>
              <button
                onClick={handleSignIn}
                className="px-4 py-2 text-xs rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 cursor-pointer transition-colors"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default DetailContent;