import { useContext } from "react"
import Hero from "../components/Hero"
import Discover from "../components/Discover"
import Popular from "../components/Popular"
import Testi from "../components/Testi"
import CommunityCTA from "../components/CommunityCTA"
// import { useSelector } from "react-redux"
import themeContext from "../../../context/theme/themeContext"
// import { selectSession, selectUser } from "../../auth/store/authSelectors"

function HomePage() {
  const {theme} = useContext(themeContext);
  // const sesi = useSelector(selectSession);
  // const cek = useSelector(selectUser);
  // const user = cek.filter(val => val.email === sesi.email)
  // console.log(user[0].name.split(' ').map(val => val[0]).join(""))
  // console.log(user[0].email);
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