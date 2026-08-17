import EventCommunities from "../../../components/communities/EventCommunities";
import community from "../../../data/communities.json";

function Popular() {
  return (
    <section className="w-full flex justify-center items-center py-4">
        <div className="max-w-6xl flex-1 flex flex-col gap-5">
            <div className="w-full flex justify-between items-center">
                <h3 className="text-lg text-gray-800 font-medium">Popular Communities</h3>
                <span className="text-xs text-gray-400">See all &#8594;</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {community.slice(0,4).map((val) => {
                    return(
                        <EventCommunities
                            key={val.id}
                            id={val.id}
                            title={val.name}
                            desc={val.description}
                            type={val.tags}
                            member={val.member_count}
                            agenda={val.upcoming_events_count}
                            pict={val.banner_url}
                        />
                    )
                })}
            </div>
        </div>
    </section>
  )
}

export default Popular