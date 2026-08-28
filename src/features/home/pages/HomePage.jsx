import { useContext } from "react"
import Hero from "../components/Hero"
import Discover from "../components/Discover"
import Popular from "../components/Popular"
import Testi from "../components/Testi"
import CommunityCTA from "../components/CommunityCTA"
import themeContext from "../../../context/theme/themeContext"

function HomePage() {
  const {theme} = useContext(themeContext);
  return (
    <>
      <main className={`flex flex-col gap-6 ${theme === 'light' ? 'bg-white' : 'bg-gray-950'}`}>
        <Hero/>
        <Discover theme={theme}/>
        <Popular theme={theme}/>
        <Testi theme={theme}/>
        <CommunityCTA theme={theme}/>
      </main>
      
    </>
  )
}

export default HomePage