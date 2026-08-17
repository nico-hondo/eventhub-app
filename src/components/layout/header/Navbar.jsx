import Guest from "./Guest";
import Attendee from "./Attendee";
import Organizer from "./Organizer";
import Admin from "./Admin";

function Navbar({role, session, onLogout}) {
    switch(role){
        case "attendee":
            return <Attendee session={session} onLogout={onLogout}/>;
        case "organizer":
            return <Organizer session={session} onLogout={onLogout}/>;
        case "admin":
            return <Admin session={session} onLogout={onLogout}/>;
        default:
            return <Guest session={session}/>;
    }
}

export default Navbar