import { useParams } from 'react-router';
import communities from '../../../data/communities.json';
import EventCommunities from '../../../components/communities/EventCommunities';

function CommunityDetailUpcomingEv() {
    const {id} = useParams();
    const filteredCommunities = communities.filter(
        (c) => c.id.toString() === id,
      )[0];

    console.log(filteredCommunities);
  return (
    <>
        <div className="max-w-6xl flex-1 flex flex-col py-4 gap-4 rounded-xl">
            <h3 className="font-semibold uppercase text-md text-gray-600">upcoming</h3>
            <div className="grid grid-cols-4 gap-5">
                
                <EventCommunities
                    key={filteredCommunities.id}
                    id={filteredCommunities.id}
                    title={filteredCommunities.name}
                    desc={filteredCommunities.description}
                    type={filteredCommunities.tags}
                    member={filteredCommunities.member_count}
                    agenda={filteredCommunities.upcoming_events_count}
                    pict={filteredCommunities.banner_url}
                />
                 
            </div>
        </div>
    </>
  )
}

export default CommunityDetailUpcomingEv