import { NavLink, Outlet } from "react-router"

function TabContent() {

  const getEventBook = localStorage.getItem('bookEvent');
  const dataEventBook = JSON.parse(getEventBook);

  return (
    <section className="w-full flex-1 flex flex-col gap-6 justify-center items-center sticky top-14 z-40">
      <div className="w-full max-w-5xl border-b border-gray-300 flex-1 flex flex-col gap-4 pt-6">
        <h2 className="text-xl text-gray-800 font-medium">My Events</h2>
        <div className="flex gap-3 text-xs text-gray-400">
          <NavLink end to="" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Upcoming <span>{`(0)`}</span></NavLink>
          <NavLink end to="past-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Past <span>{`(0)`}</span></NavLink>
          <NavLink end to="saved-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Saved <span>{`(${dataEventBook.length})`}</span></NavLink>
        </div>
      </div>

      <div className="w-full flex justify-center">
          <Outlet/>
      </div>
    </section>
  )
}

export default TabContent