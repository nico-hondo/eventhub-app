import { useState, useContext } from "react";

import { Link } from "react-router";
import slugify from 'slugify';
import { CiCalendar } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";
import { BsFillTicketPerforatedFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import themeContext from "../../context/theme/themeContext";
import { useDispatch, useSelector } from "react-redux";
import { selectSession, selectRole, selectUser } from "../../features/auth/store/authSelectors";
import {joinCommunityThunk} from "../../redux/slices/registerSlice";
import { useNavigate } from "react-router";
import {toast} from "react-toastify";

function EventCommunities({id, title, desc, type, member, agenda, pict}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useDispatch();
    const session = useSelector(selectSession);
    const role = useSelector(selectRole);
    const users = useSelector(selectUser);
    const user = users.find((val) => val.email === session?.email);
    const slug = slugify(title, {
        lower: true,
        strict: true
    })

    //kita buat fungsi untuk ngehandle ketika ingin ditambah maupun dihapus dari katalog join community
    const handleJoin = async () => {
        if(!user){
            setIsModalOpen(true);
        }

        if(role === "organizer" || role === "admin"){
            return;
        }

        const waitPromise = dispatch(joinCommunityThunk({communityId: id, userEmail: session.email})).unwrap();

        toast.promise(
            waitPromise,{
                pending: "Joining Community...",
                success: "Join Community Successful",
                error: "Join Community Failed",
            },
            {position: "top-right", autoClose: 900}
        )

        try{
            await waitPromise;
        }catch(error){
            console.error("Error joining community:", error);
        }
    }

    const {theme} = useContext(themeContext);
    const navigate = useNavigate();
    const handleSignIn = () => {
        navigate("auth");
    }
  return (
    <>
        <article className={`flex flex-col h-full border ${theme === 'light' ? 'border-gray-100': 'border-gray-800 shadow-sm shadow-gray-900'} shadow-xl rounded-xl overflow-hidden`}>
            <div className="relative">
                <img
                    src={pict}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
                <div className="flex absolute right-2 top-2 gap-2">
                    <span className={`gap-1 items-center px-3 py-0.1 text-[11px] text-gray-100 font-medium bg-green-500  rounded-full ${user?.community_id?.includes(id) ? 'flex' : 'hidden' }`}> <IoCheckmark className="text-xs"/> Joined</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
                <Link to={`/communities/${id}/${slug}`}>
                    <p className={`text-md ${theme === 'light' ? 'text-gray-900' : "text-gray-300"} font-medium`}>{title}</p>
                    <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} mt-1 flex-1 leading-5`}>{desc}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                       
                        <span className="px-3 py-0.5 text-xs text-amber-500 bg-white/10 border border-gray-400 rounded-full">{type}</span>

                    </div>

                    <div className={`flex flex-wrap text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-400'} gap-4 mt-3`}>
                        <div className="flex items-center gap-1">
                            <IoPeopleOutline />
                            <span>{member} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <CiCalendar />
                            <span>{agenda} upcoming</span>
                        </div>
                    </div>
                </Link>
                {user?.community_id?.includes(id) ? 
                    (<button className="w-full h-8 mt-4 text-xs flex justify-center items-center bg-green-600 rounded-lg text-gray-100 font-medium cursor-pointer"
                        onClick={handleJoin}
                        disabled={role === "organizer" || role === "admin"}
                    >
                        <IoCheckmark /> Joined
                    </button>)

                    :

                    (<button className={`w-full h-8 mt-4 text-xs flex justify-center items-center ${role === "organizer" || role === "admin" ? "bg-orange-300 text-gray-200" : "bg-orange-600"} rounded-lg text-gray-100 font-medium cursor-pointer `}
                        onClick={handleJoin}
                        disabled={role === "organizer" || role === "admin"}
                    >
                        Join Event
                    </button>)
                }
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

export default EventCommunities