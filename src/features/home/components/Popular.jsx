import { useEffect, useState } from "react";
import EventCommunities from "../../../components/communities/EventCommunities";
import fetchUrl from "../../../components/utils/fetchUrl";

function Popular({theme}) {
    const [communities, setCommunity] = useState([])

    const BASE_URL = import.meta.env.VITE_API_URL || '/api';
    useEffect(() => {
        (async () => {
            try{
                const url = `${BASE_URL}/community/popular`;
                const result = await fetchUrl(url);
                setCommunity(result?.Data || []);
            }catch (err) {
                console.log(err)
            }
        })();
    });

    // console.log(communities)
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className={`text-lg ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'} font-medium`}>Popular Communities</h3>
                <span className="text-xs text-gray-400">See all &#8594;</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {communities.map((val) => {
                    return(
                        <EventCommunities
                            key={val.id}
                            id={val.id}
                            title={val.name}
                            desc={val.description}
                            type={val.category}
                            member={val.total_members}
                            agenda={val.total_upcoming_events}
                            pict={val.image_url}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Popular