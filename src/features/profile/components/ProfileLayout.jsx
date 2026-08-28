import { NavLink, Outlet, useLocation } from "react-router";
import { useContext, useState, useRef, useEffect } from "react";

import { MdOutlineLocationOn } from "react-icons/md";
import { IoCalendarClearOutline } from "react-icons/io5";
import { FiEdit2, FiX, FiCamera } from "react-icons/fi";
import themeContext from "../../../context/theme/themeContext";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth" // biar ada animasi
    });
  }, [pathname]);

  return null;
}

function ProfileLayout() {
  const {theme} = useContext(themeContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // 1. state buat modal
  const fileInputRef = useRef(null);

  const session = localStorage.getItem('session');
  const dataSesi = JSON.parse(session);

   // 1. Tambah avatar di state formData. Ambil dari session kalau ada
  const [formData, setFormData] = useState({
    nama: dataSesi.nama,
    location: dataSesi.location || "Bandung, Indonesia",
    bio: dataSesi.bio || "Lorem ipsum dolor sit amet...",
    avatar: dataSesi.avatar || null // <-- simpan base64 / url foto di sini
  })

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  // 2. Handler buat upload foto
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({...formData, avatar: reader.result}); // simpan base64
      }
      reader.readAsDataURL(file);
    }
  }

  const handleSave = () => {
    const updatedSession = {...dataSesi,...formData}
    localStorage.setItem('session', JSON.stringify(updatedSession));
    setIsModalOpen(false);
    window.location.reload();
  }

  const community = localStorage.getItem('joinCommunity');
  const dataCommunity = JSON.parse(community);

  const joinCommunity = dataCommunity.filter(val => val.email === dataSesi.email);
  let countJoinCommunity = joinCommunity.length;

  const isJoinedCommunity = dataCommunity.some((val) => {
    return val.email === dataSesi.email;
  })

  const event = localStorage.getItem('joinEvent');
  const dataEvent = JSON.parse(event);

  const joinEvent = dataEvent.filter(val => val.email === dataSesi.email);
  let countJoinEvent = joinEvent.length;

  const isJoinedEvent = dataEvent.some((val) => {
    return val.email === dataSesi.email;
  })

  const book = localStorage.getItem('bookEvent');
  const dataBook = JSON.parse(book);

  const bookEvent = dataBook.filter(val => val.email === dataSesi.email);
  const countBook = bookEvent.length;

  const isBook = dataEvent.some(val => val.email === dataSesi.email);

  const firstLetter = dataSesi.nama.split(' ').map(val => val[0]).join("");

  return (
    <>
    <ScrollToTop/>
    <main className={`w-full flex flex-col gap-6 justify-center items-center sticky top-14 z-40 ${theme === 'light'? 'bg-white' : 'bg-black'}`}>
      <section className={`w-full max-w-5xl border-b ${theme === 'light'? 'border-gray-300' : 'border-gray-700'} flex-1 flex flex-col gap-4`}>
        <div className="w-full flex flex-col gap-4 pt-8">
          <div className="flex justify-between items-start">
            <div className="flex gap-4">
              <div className="w-fit h-fit">
                <div className="w-20 h-20 rounded-xl text-xl flex justify-center items-center font-semibold bg-orange-400 text-gray-100"><span>{firstLetter}</span></div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <h2 className={`text-xl font-semibold ${theme === 'light'? 'text-gray-900' : 'text-gray-300'}`}>{dataSesi.nama}</h2>
                  <p className="text-xs text-gray-500">{dataSesi.email}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1 text-xs text-gray-400"><MdOutlineLocationOn/>Bandung, Indonesia</span>
                  <span className="flex items-center gap-1 text-xs text-gray-400"><IoCalendarClearOutline/>Joined March 2025</span>
                  <span className="px-4 py-0.5 text-orange-600 font-medium bg-orange-200 text-xs rounded-full capitalize">{dataSesi.role}</span>
                </div>
                <span className="text-xs text-gray-400">{formData.bio}</span>
              </div>
            </div>
            <div
              onClick={() => setIsModalOpen(true)}
              className={`w-40 h-10 rounded-lg flex gap-2 justify-center items-center border ${theme === 'light'? 'border-gray-300 text-gray-600 hover:bg-gray-100' : 'border-gray-700 text-gray-300 hover:bg-gray-900'} text-xs font-medium cursor-pointer`}
            >
              <FiEdit2/><span>Edit Profile</span>
            </div>
          </div>

          <div className={`flex justify-center items-center ${theme === 'light' ? 'text-gray-800' : 'text-gray-300'}`}>
            <div className="flex-1 flex flex-col justify-center items-center"><span className="text-xl font-bold">{isJoinedEvent? countJoinEvent : '0'}</span><span className="text-gray-500 text-[12px] font-medium">Events</span></div>
            <div className={`flex-1 flex flex-col justify-center items-center border-l border-r ${theme === 'light'? 'border-gray-300' : 'border-gray-700'}`}><span className="text-xl font-bold">{isJoinedCommunity? countJoinCommunity : '0'}</span><span className="text-gray-500 text-[12px] font-medium">Communities</span></div>
            <div className="flex-1 flex flex-col justify-center items-center"><span className="text-xl font-bold">{isBook? countBook : '0'}</span><span className="text-gray-500 text-[12px] font-medium">Saved</span></div>
          </div>
          <div className="flex gap-3 text-xs text-gray-400">
            <NavLink end to="" className={({ isActive }) =>
            `${isActive? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Events </NavLink>
            <NavLink end to="community" className={({ isActive }) =>
            `${isActive? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Communities</NavLink>
            <NavLink end to="saved" className={({ isActive }) =>
            `${isActive? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
            }>Saved</NavLink>
          </div>
        </div>
      </section>
      <section className="w-full flex justify-center items-center py-6">
          <Outlet/>
      </section>
    </main>

    {/* 4. KOMPONEN MODAL */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>

        <div className={`relative w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === 'light'? 'bg-white' : 'bg-gray-900'}`}>
          <div className="flex justify-between items-center mb-4">
            <h3 className={`text-lg font-semibold ${theme === 'light'? 'text-gray-900' : 'text-gray-100'}`}>Edit Profile</h3>
            <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600"><FiX /></button>
          </div>

          <div className="flex flex-col gap-4">
            {/* Avatar + Upload */}
            <div className="flex flex-col items-start gap-3">
              <div className="relative group">
                {/* 3. LOGIC: Kalau ada avatar tampilkan img, kalau tidak tampilkan firstLetter */}
                {formData.avatar? (
                  <img
                    src={formData.avatar}
                    alt="avatar"
                    className="w-20 h-20 rounded-xl object-cover"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-xl text-2xl flex justify-center items-center font-semibold bg-orange-400 text-gray-100">
                    <span>{firstLetter}</span>
                  </div>
                )}

                {/* Tombol camera buat ganti foto */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-gray-800 rounded-full border-2 border-white hover:bg-gray-700"
                >
                  <FiCamera className="text-white w-3 h-3"/>
                </button>
              </div>

              {/* Input file disembunyiin */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/png, image/jpeg"
                className="hidden"
                onChange={handleAvatarChange}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current.click()}
                className="text-xs text-orange-600 font-medium hover:underline"
              >
                Upload photo
              </button>
            </div>

            {/* Full Name */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme === 'light'? 'text-gray-700' : 'text-gray-300'}`}>Full Name</label>
              <input type="text" name="nama" value={formData.nama} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === 'light'? 'border-gray-300 bg-white' : 'border-gray-700 bg-gray-800 text-white'}`}/>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme === 'light'? 'text-gray-700' : 'text-gray-300'}`}>Location</label>
              <input type="text" name="location" value={formData.location} onChange={handleChange} className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 ${theme === 'light'? 'border-gray-300 bg-white' : 'border-gray-700 bg-gray-800 text-white'}`}/>
            </div>

            {/* Bio */}
            <div className="flex flex-col gap-1">
              <label className={`text-sm font-medium ${theme === 'light'? 'text-gray-700' : 'text-gray-300'}`}>Bio</label>
              <textarea name="bio" value={formData.bio} onChange={handleChange} rows="3" placeholder="Tell the community a little about yourself..." className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none ${theme === 'light'? 'border-gray-300 bg-white' : 'border-gray-700 bg-gray-800 text-white'}`}/>
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 text-sm rounded-lg font-medium ${theme === 'light'? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>Cancel</button>
            <button onClick={handleSave} className="px-4 py-2 text-sm rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700">Save Changes</button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}

export default ProfileLayout