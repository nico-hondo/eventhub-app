import { NavLink, Outlet } from "react-router"

function TabContent({theme}) {

  const session = localStorage.getItem('session');
  const dataSesi = JSON.parse(session);

  const dataBook = localStorage.getItem('bookEvent');
  const bookEvent = JSON.parse(dataBook);

  const findBook = bookEvent.filter((val) => {
      return val.email === dataSesi.email;
  })
  const dataJoinEvent = localStorage.getItem('joinEvent');
  const dataEvent = JSON.parse(dataJoinEvent);

  const joinEvent = dataEvent.filter(val => val.email === dataSesi.email)

  const countBook = findBook.length;

  // console.log(countBook)
  return (
    <section className="w-full flex-1 flex flex-col gap-6 justify-center items-center sticky top-14 z-40">
      <div className={`w-full max-w-5xl border-b ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'} flex-1 flex flex-col gap-4 pt-6`}>
        <h2 className={`text-xl ${theme === 'light' ? 'text-gray-800' : 'text-gray-200'} font-medium`}>My Events</h2>
        <div className="flex gap-3 text-xs text-gray-400">
          <NavLink end to="" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Upcoming <span>{`(${joinEvent.length})`}</span></NavLink>
          <NavLink end to="past-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Past <span>{`(0)`}</span></NavLink>
          <NavLink end to="saved-event" className={({ isActive }) =>
          `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
          }>Saved <span>{`(${countBook})`}</span></NavLink>
        </div>
      </div>

      <div className="w-full max-w-5xl flex">
          <Outlet/>
      </div>
    </section>
  )
}

export default TabContent