import { NavLink, Outlet } from "react-router"
import { useSelector } from "react-redux"
// import { selectSession, selectUser } from "../../auth/store/authSelectors"

function TabContent({theme}) {

  // const session = useSelector(selectSession);
  // const users = useSelector(selectUser);

  // const user = users.filter((val) => val.email === session.email);

  const {myEvents} = useSelector((state) => state.events) || [];
  const {saved_events} = useSelector((state) => state.events) || [];

  return (
    <section className="w-full flex-1 flex flex-col gap-6 justify-center items-center sticky top-14 z-40">
      <div className={`w-full max-w-5xl border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} flex-1 flex flex-col gap-4 pt-6`}>
        <h2 className={`text-xl ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} font-medium`}>My Events</h2>
        <div className="flex gap-3 text-xs text-gray-400">
          <NavLink end to="" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Upcoming <span>{`(${myEvents.length === 0 ? '0' : myEvents.length})`}</span></NavLink>
          <NavLink end to="past-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Past <span>{`(0)`}</span></NavLink>
          <NavLink end to="saved-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Saved <span>{`(${saved_events.length === 0 ? '0' : saved_events.length})`}</span></NavLink>
        </div>
      </div>

      <div className="w-full max-w-5xl flex">
          <Outlet/>
      </div>
    </section>
  )
}

export default TabContent