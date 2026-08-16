import { useState } from "react";
import EventCommunities from "../../../components/communities/EventCommunities";
import { communities } from "../services/data-dummy";

function Popular() {
    const [data] = useState(communities);
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg text-gray-800 font-medium">Popular Communities</h3>
                <span className="text-xs text-gray-400">See all &#8594;</span>
            </div>
            <div className="grid grid-cols-4 gap-4">
                {data.map((val) => {
                    return(
                        <EventCommunities
                            key={val.id}
                            title={val.title}
                            desc={val.desc}
                            type={val.type}
                            member={val.member}
                            agenda={val.agenda}
                            pict={val.img}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Popular