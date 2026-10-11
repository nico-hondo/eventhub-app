import EventDiscover from "../../../components/event/EventDiscover";
import { convertDate, convertHour } from "../../../components/utils/utilitas";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../../redux/slices/eventSlice";

function Discover({theme}) {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchEvents())
    },[dispatch])
    
    const {events} = useSelector((state) => state.events)

    console.log(events);
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className={`text-lg ${theme === 'light' ? 'text-gray-800': 'text-gray-300'} font-medium`}>Discover events that interest you</h3>
                <span className="text-xs text-gray-400 cursor-pointer">See all &#8594;</span>
            </div>
            <div className="grid grid-rows-2 grid-cols-3 gap-5">
                {events.map((val) => {
                    return(
                        <EventDiscover
                            key={val.id}
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
    </section>
  )
}

export default Discover