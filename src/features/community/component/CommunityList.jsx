import communities from '../../../data/communities.json';
import EventCommunities from '../../../components/communities/EventCommunities';

function CommunityList() {
    const filter = ['All Categories', 'Technology', 'Design', 'Business', 'Career', 'AI', 'Programming', 'Music'];

    const lengthListCommunity = communities.length;
  return (
        <section className="w-full flex justify-center items-center">
            <div className="max-w-6xl flex-1 flex flex-col gap-10 py-6">
                <div className="flex gap-4">
                    <div className="flex gap-2 p-1 text-xs font-medium border border-gray-200 rounded-lg">
                        <span className="text-gray-200 px-3 py-1.5 bg-orange-600 rounded-md cursor-pointer">All</span>
                        <span className="text-gray-700 px-3 py-1.5 rounded-md cursor-pointer">Joined</span>
                        <span className="text-gray-700 px-3 py-1.5 rounded-md cursor-pointer">Not Joined</span>
                    </div>
                
                    <div className="flex gap-2 text-xs font-medium">
                        {filter.map((val) => {
                            return(
                                <div key={val} className="flex justify-center items-center gap-2 text-gray-200 text-center">
                                    <span className="bg-orange-600 rounded-md px-3 py-1 cursor-pointer">{val}</span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="flex flex-col gap-4">
                    <p className="text-sm text-gray-400"><span className="text-gray-700 font-medium">{lengthListCommunity}</span> events found</p>
                        <div className="grid grid-rows-2 grid-cols-4 gap-5">
                            {communities.map((val) => {
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
            </div>
        </section>
  )
}

export default CommunityList