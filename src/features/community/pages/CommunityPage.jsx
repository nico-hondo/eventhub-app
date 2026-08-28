import { useContext } from "react"
import SearchIntro from "../component/SearchIntro"
import CommunityList from "../component/CommunityList"
import themeContext from "../../../context/theme/themeContext"

function CommunityPage() {
    const {theme} = useContext(themeContext);
    return (
        <main className={`w-full flex flex-col ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <SearchIntro />
            <CommunityList theme={theme} />
        </main>
    )
}

export default CommunityPage