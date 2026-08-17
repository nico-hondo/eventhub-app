import TabContent from "../component/TabContent";
import SavedEvent from "../component/SavedEvent";

function MyEvents() {
    return (
        <main className="w-full flex flex-col justify-center items-center">
            <TabContent/>
            <SavedEvent/>
        </main>
    )
}

export default MyEvents