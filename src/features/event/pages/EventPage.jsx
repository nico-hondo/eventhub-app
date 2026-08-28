import { useContext } from "react"
import SearchEvent from "../component/SearchEvent"
import EventList from "../component/EventList"
import themeContext from "../../../context/theme/themeContext"

function EventPage() {
    const {theme} = useContext(themeContext);
    return (
        <main className={`w-full flex flex-col ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <SearchEvent theme={theme}/>
            <EventList theme={theme}/>
        </main>
    )
}

export default EventPage