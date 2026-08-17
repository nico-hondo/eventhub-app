import events from '../../../data/events.json';
import EventDiscover from '../../../components/event/EventDiscover';
import { convertDate } from '../../../components/utils/utilitas';

function EventList() {
    const lengthEvent = events.length;
    return (
        <section className="w-full flex justify-center items-center pt-4 pb-8">
            <div className="max-w-6xl flex-1 flex flex-col gap-5">
                <p className="text-sm text-gray-400"><span className="text-gray-700 font-medium">{lengthEvent}</span> events found</p>
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
                <div className="w-full flex justify-center items-center">
                    <span className="px-6 py-2.5 border border-gray-300 text-xs text-gray-700 font-medium rounded-lg cursor-pointer hover:font-bold hover:border-gray-500">Load more events</span>
                </div>
            </div>
        </section>
    )
}

export default EventList