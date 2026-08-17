import SearchIntro from "../component/SearchIntro"
import CommunityList from "../component/CommunityList"

function CommunityPage() {
    return (
        <main className="w-full flex flex-col">
            <SearchIntro />
            <CommunityList />
        </main>
    )
}

export default CommunityPage