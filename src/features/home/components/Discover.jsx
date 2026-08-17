// import { useState } from "react";
import EventDiscover from "../../../components/event/EventDiscover";
import events from '../../../data/events';
import { convertDate } from "../../../components/utils/utilitas";

function Discover() {
    // const [data] = useState(discover);
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg text-gray-800 font-medium">Discover events that interest you</h3>
                <span className="text-xs text-gray-400 cursor-pointer">See all &#8594;</span>
            </div>
            <div className="grid grid-rows-2 grid-cols-3 gap-5">
                {events.slice(0,6).map((val) => {
                    return(
                        <EventDiscover
                            key={val.id}
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
    </section>
  )
}

export default Discover