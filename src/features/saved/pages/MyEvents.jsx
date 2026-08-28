import { useContext } from "react";
import TabContent from "../component/TabContent";
import themeContext from "../../../context/theme/themeContext";

function MyEvents() {
    const {theme} = useContext(themeContext);

    return (
        <main className={`w-full flex flex-col justify-center items-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
            <TabContent theme={theme}/>
        </main>
    )
}

export default MyEvents