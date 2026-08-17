
import Hero from "../components/Hero"
import Discover from "../components/Discover"
import Popular from "../components/Popular"
import Testi from "../components/Testi"
import CommunityCTA from "../components/CommunityCTA"

function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-6">
        <Hero/>
        <Discover/>
        <Popular/>
        <Testi />
        <CommunityCTA/>
      </main>
      
    </>
  )
}

export default HomePage