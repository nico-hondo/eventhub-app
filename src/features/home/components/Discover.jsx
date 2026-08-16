import { useState } from "react";
import EventDiscover from "../../../components/event/EventDiscover";
import { discover } from "../services/data-dummy";

function Discover() {
    const [data] = useState(discover);
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg text-gray-800 font-medium">Discover events that interest you</h3>
                <span className="text-xs text-gray-400 cursor-pointer">See all &#8594;</span>
            </div>
            <div className="grid grid-rows-2 grid-cols-3 gap-5">
                {data.map((val) => {
                    return(
                        <EventDiscover
                            key={val.id}
                            type={val.type}
                            title={val.title}
                            date={val.date}
                            hour={val.hour}
                            at={val.at}
                            participant={val.participant}
                            slot={val.slot}
                            pict={val.img}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Discover