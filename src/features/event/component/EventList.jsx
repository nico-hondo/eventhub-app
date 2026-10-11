// import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate, convertHour } from '../../../components/utils/utilitas';
import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents } from '../../../redux/slices/eventSlice';
import { useSearchParams } from 'react-router';

function EventList({theme}) {
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";
    const location = searchParams.get("location") || "";

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEvents({search, location, category}));
    }, [dispatch, search, location, category]);
    
    
    const {events = [], isLoading, error} = useSelector((state) => state.events);

    const lengthEvent = events.length;

    console.log("Halo",events);
    if(isLoading) return <div className="text-center mt-10">Loading...</div>

    if(error) return <div className="text-center mt-10">{error}</div>
    return (
        <section className="w-full flex justify-center items-center pt-4 pb-8">
            <div className="max-w-6xl flex-1 flex flex-col gap-5">
                <p className="text-sm text-gray-400"><span className={`${theme==='light' ? 'text-gray-700' : 'text-gray-200'} font-medium`}>{lengthEvent}</span> events found</p>
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
                <div className="w-full flex justify-center items-center">
                    <span className={`px-6 py-2.5 border ${theme === 'light' ? 'border-gray-300 text-gray-700' : 'border-gray-600 text-gray-300'} text-xs font-medium rounded-lg cursor-pointer hover:font-bold hover:border-gray-500`}>Load more events</span>
                </div>
            </div>
        </section>
    )
}

export default EventList