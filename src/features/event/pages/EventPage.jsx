import SearchEvent from "../component/SearchEvent"
import EventList from "../component/EventList"

function EventPage() {
    return (
        <main className="w-full flex flex-col">
            <SearchEvent/>
            <EventList/>
        </main>
    )
}

export default EventPage