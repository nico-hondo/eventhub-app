import { NavLink, Outlet } from "react-router";

import { MdOutlineLocationOn } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";

function ProfileLayout() {

  const session = localStorage.getItem('session');
  const dataSesi = JSON.parse(session);
  
  const community = localStorage.getItem('joinCommunity');
  const dataCommunity = JSON.parse(community);
  
  const event = localStorage.getItem('joinEvent');
  const dataEvent = JSON.parse(event);

  const book = localStorage.getItem('bookEvent');
  const dataBook = JSON.parse(book);
  
  const firstLetter = dataSesi.nama.split(' ').map(val => val[0]).join("");

  return (
    <main className="w-full flex flex-col gap-6 justify-center items-center sticky top-14 z-40">
      <section className="w-full max-w-5xl border-b border-gray-300 flex-1 flex flex-col gap-4">
        <div className="w-full flex flex-col gap-4 pt-8">
          <div className="flex gap-4">
            <div className="w-fit h-fit">
              <div className="w-20 h-20 rounded-xl text-xl flex justify-center items-center font-semibold bg-orange-400 text-gray-100"><span>{firstLetter}</span></div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <h2 className="text-xl font-semibold text-gray-900">{dataSesi.nama}</h2>
                <p className="text-xs text-gray-500">{dataSesi.email}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-xs text-gray-400"><MdOutlineLocationOn/>Bandung, Indonesia</span>
                <span className="flex items-center gap-1 text-xs text-gray-400"><IoCalendarClearOutline/>Joined March 2025</span>
                <span className="px-4 py-0.5 text-orange-600 font-medium bg-orange-200 text-xs rounded-full capitalize">{dataSesi.role}</span>
              </div>
              <span className="text-xs text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis exercitationem, at quam iste excepturi eos blanditiis aut voluptatem, facilis dolorum saepe illo dicta quos sit accusantium nemo. Amet, placeat ipsum?</span>
            </div>
            <div className="w-40 h-10 rounded-lg flex gap-2 justify-center items-center border border-gray-300 text-xs text-gray-600 font-medium cursor-pointer hover:bg-gray-100"><FiEdit2/><span>Edit Profile</span></div>
          </div>
          <div className="flex justify-center items-center">
            <div className="flex-1 flex flex-col justify-center items-center"><span className="text-xl text-gray-800 font-bold">{dataEvent.length}</span><span className="text-gray-500 text-[12px] font-medium">Events</span></div>
            <div className="flex-1 flex flex-col justify-center items-center border-l border-r border-gray-300"><span className="text-xl text-gray-800 font-bold">{dataCommunity.length}</span><span className="text-gray-500 text-[12px] font-medium">Communities</span></div>
            <div className="flex-1 flex flex-col justify-center items-center"><span className="text-xl text-gray-800 font-bold">{dataBook.length}</span><span className="text-gray-500 text-[12px] font-medium">Saved</span></div>
          </div>
          <div className="flex gap-3 text-xs text-gray-400">
            <NavLink end to="" className={({ isActive }) =>
            `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Events </NavLink>
            <NavLink end to="community" className={({ isActive }) =>
            `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Communities</NavLink>
            <NavLink end to="saved" className={({ isActive }) =>
            `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Saved</NavLink>
          </div>
        </div>
      </section>
      <div className="w-full flex justify-center">
          <Outlet/>
      </div>
    </main>
  )
}

export default ProfileLayout