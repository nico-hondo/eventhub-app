import { useParams } from 'react-router';
import EventCommunities from '../../../components/communities/EventCommunities';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCommunityById } from '../../../redux/slices/communitySlice';

function CommunityDetailUpcomingEv() {
    const {id} = useParams();
    const dispatch = useDispatch(id);

    useEffect(() => {
        if(id){
            dispatch(fetchCommunityById(id));
        }
    }, [dispatch, id])

    const {communityDetail, isLoading, error} = useSelector((state) => state.community)

    if (isLoading){
        return <div className="text-center mt-10">Loading detail community...</div>;
    }
    if (error || !communityDetail) {
        return <div className="text-center mt-10">Community not found</div>;
    }
  return (
    <>
        <div className="max-w-6xl flex-1 flex flex-col py-4 gap-4 rounded-xl">
            <h3 className="font-semibold uppercase text-md text-gray-600">upcoming</h3>
            <div className="grid grid-cols-4 gap-5">
                {communityDetail?.upcoming_events?.map((event) => {
                    return(
                        <EventCommunities
                            key={event.id}
                            id={event.id}
                            title={event.title}
                            desc={event.description}
                            type={event.category}
                            member={event.total_participants}
                            agenda={communityDetail.total_upcoming_events}
                            pict={event.image_url}
                        />
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default CommunityDetailUpcomingEv