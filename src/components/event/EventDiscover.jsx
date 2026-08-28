import { useState, useContext } from "react";
import { CiCalendar } from "react-icons/ci";
import { IoLocationOutline } from "react-icons/io5";
import { IoPeopleOutline } from "react-icons/io5";
import { IoBookmarkOutline } from "react-icons/io5";
import { IoBookmark } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { FiX } from "react-icons/fi";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router";
import slugify from 'slugify';
import themeContext from "../../context/theme/themeContext";

function EventDiscover({id, type, title, date, hour, at, participant, slot, pict}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [joinedEvent, setJoinedEvent] = useState(() => {
        const joinEvent = localStorage.getItem("joinEvent");
    
        return joinEvent ? JSON.parse(joinEvent) : [];
    });

    //bookmark getItem
    const [bookmarkEvent, setBookmark] = useState(() => {
        const bookEvent = localStorage.getItem("bookEvent");

        return bookEvent ? JSON.parse(bookEvent) : [];
    })
    
    const session = localStorage.getItem('session');
    const dataSesi = session ? JSON.parse(session) : null;

    const percentage = (participant / slot) * 100;

    const slug = slugify(title, {
        lower: true,
        strict: true
    });

    //cek apakah id yang kita tujuh sudah ada di join?
    const isJoined = dataSesi ? joinedEvent.some(ev => String(ev.id) === String(id) && ev.email === dataSesi.email) : false;

    const isBook = dataSesi ? bookmarkEvent.some(ev => String(ev.id) === String(id) && ev.email === dataSesi.email) : false;

    //hati hati memakai useEffect
    //Jadi ada cascading render: effect berjalan setelah render pertama, lalu langsung memaksa state berubah sehingga terjadi render kedua.

    // Padahal localStorage di sini sebenarnya cuma sumber data awal, bukan sesuatu yang perlu disinkronkan terus-menerus menggunakan effect.

    const handleJoin = () => {
        if(!session) return setIsModalOpen(true);


        const newJoinEvent = {id, title, user:dataSesi.nama, email:dataSesi.email, role:dataSesi.role};

        const currentJoinEvent = JSON.parse(localStorage.getItem('joinEvent')) || [];

        const alreadyJoin = currentJoinEvent.some(ev => String(ev.id) === String(id));

        let updateEvents;
        if(alreadyJoin){
            //Jika sudah join, maka kita bisa kita klik kembali tombol untuk menghapus dari join
            updateEvents = currentJoinEvent.filter(val => String(val.id) !== String(id));
        }else{
            //ya jika belum maka ditambah, dengan tentunya spread operator
            updateEvents = [...currentJoinEvent, newJoinEvent];
        }
        localStorage.setItem('joinEvent', JSON.stringify(updateEvents));
        setJoinedEvent(updateEvents); //update state, biar terjadi re-render
    }

    const handleBookmark = () => {
        if(!session) return setIsModalOpen(true);

        const tags = type;
        const newBookmark = {id, tags, title, date, hour, at, participant, slot, pict, email:dataSesi.email, role:dataSesi.role};

        const currentBookmark = JSON.parse(localStorage.getItem('bookEvent')) || [];

        const alreadyBook = currentBookmark.some(ev => String(ev.id) === String(id) && ev.email === dataSesi.email);

        let updateBookEvent;

        //bisa kita coba ternary hehe
        updateBookEvent = alreadyBook ? currentBookmark.filter(ev => String(ev.id) !== String(id)) : [...currentBookmark, newBookmark]

        localStorage.setItem('bookEvent', JSON.stringify(updateBookEvent));
        setBookmark(updateBookEvent);
    }
    
    const sisaSlot = slot - participant

    const {theme} = useContext(themeContext);

    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("auth");
    }
  return (
    <>
      <article className={`border ${theme === 'light' ? 'border-gray-100' : 'border-gray-800 shadow-sm shadow-gray-900'} shadow-xl rounded-xl`}>
            <Link to={`/events/${id}/${slug}`}>
                <div className="relative">
                    <img src={pict} alt={title} className="w-full h-50 object-cover rounded-tl-xl rounded-tr-xl"/>
                    <div className="flex absolute left-2 bottom-2 gap-2">
                        {type.map(val => <span key={val} className="px-3 py-1 text-xs text-amber-500 bg-white/10 border border-gray-400 rounded-full">{val}</span>)}
                    </div>
                </div>
            </Link>
            <div className="flex flex-col gap-3 p-4">
                <p className={`text-md ${theme === 'light' ? 'text-gray-900' : 'text-gray-300'} font-medium`}>{title}</p>
                <div className="flex flex-col gap-1 text-sm text-gray-400">
                    <div className="flex gap-2 items-center">
                        <CiCalendar/>
                        <span className="flex gap-1 items-center text-xs">{date} <span className="text-[8px]">●</span>{hour}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoLocationOutline/>
                        <span className="text-xs">{at}</span>
                    </div>
                    <div className="flex gap-2 items-center">
                        <IoPeopleOutline/>
                        <span className="text-xs">{participant} / {slot} attendees</span>
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                        <span className="text-xs">{participant} attendees</span>
                        <span className="text-xs">{slot} capacity</span>
                    </div>
                    <div className={`w-full relative h-2 rounded-full bg-gray-200 before:content-[''] before:absolute before:w-(--progress) before:h-2 ${sisaSlot === 0 ? "before:bg-red-600" : percentage <= 50 ? "before:bg-green-600" : "before:bg-yellow-500"} before:rounded-full`} style={{ "--progress": `${percentage}%` }}></div>
                </div>
                <div className="w-full flex gap-2">
                    {isJoined ?   
                            (<span className="w-full h-8 text-xs flex justify-center items-center gap-1 bg-green-700 rounded-lg text-gray-100 font-medium cursor-pointer"
                                onClick={handleJoin}
                            > <IoCheckmark/>Registered</span>)
                        : 
                        (<span className="w-full h-8 text-xs flex justify-center items-center bg-orange-600 rounded-lg text-gray-100 font-medium cursor-pointer"
                            onClick={handleJoin}
                        >Join Event</span>)
                    }
                    
                    <div className={`w-9 flex justify-center items-center border  ${isBook ? "text-orange-500 border-orange-300" : `text-gray-400 ${theme === 'light' ? 'border-gray-200' : 'border-gray-800'}`} rounded-md cursor-pointer`}
                        onClick={handleBookmark}                    
                    >
                        {isBook ? <IoBookmark /> : <IoBookmarkOutline/>}
                        
                    </div>
                </div>
            </div>
      </article>

      {/* 4. KOMPONEN MODAL */}
          {isModalOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
      
              <div className={`relative w-full max-w-md rounded-xl shadow-2xl p-6 ${theme === 'light'? 'bg-white' : 'bg-gray-900'}`}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className={`text-md font-semibold ${theme === 'light'? 'text-gray-900' : 'text-gray-100'}`}>Sign in to Continue</h3>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer"><FiX /></button>
                </div>
      
                <div className="py-6 flex flex-col gap-4 justify-center items-center text-center">
                    <BsFillTicketPerforatedFill className="text-orange-500 text-2xl"/>
                    <p className="text-xs text-gray-500">Create a free account to register for events, save favourites, join communities, and get personalised recommendations.</p>
                </div>
      
                <div className="flex justify-end gap-3 mt-6">
                  <button onClick={() => setIsModalOpen(false)} className={`px-4 py-2 text-sm rounded-lg font-medium cursor-pointer ${theme === 'light'? 'bg-gray-100 text-gray-700 hover:bg-gray-200' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}>Keep Browsing</button>
                  <button onClick={handleSignIn} className="px-4 py-2 text-sm rounded-lg font-medium bg-orange-600 text-white hover:bg-orange-700 cursor-pointer">Sign In</button>
                </div>
              </div>
            </div>
          )}
    </>
  )
}

export default EventDiscover