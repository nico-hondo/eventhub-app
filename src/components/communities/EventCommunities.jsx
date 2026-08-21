import { useState } from "react";

import { Link } from "react-router";
import slugify from 'slugify';

import { CiCalendar } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";
import { IoCheckmark } from "react-icons/io5";

function EventCommunities({id, title, desc, type, member, agenda, pict}) {
    const slug = slugify(title, {
        lower: true,
        strict: true
    })

    const [joinedCommunity, setJoinedCommunity] = useState(() => {
        const joinCommunity = localStorage.getItem('joinCommunity');

        return joinCommunity ? JSON.parse(joinCommunity) : [];
    });

    const session = localStorage.getItem('session');
    const dataSesi = JSON.parse(session);

    //kita cek apakah id yang saat ini sudah ada di join community
    const isJoined = joinedCommunity.some(val => String(val.id) === String(id) && val.email === dataSesi.email
    );

    //kita buat fungsi untuk ngehandle ketika ingin ditambah maupun dihapus dari katalog join community
    const handleJoin = () => {
        if(!session) return console.log("Login dulu");

        const newJoinCommunity = {id, title, user:dataSesi.nama, email:dataSesi.email, role:dataSesi.role};

        //kita ambil current data dari localstorage
        const currentJoinCommunity = JSON.parse(localStorage.getItem('joinCommunity')) || [];

        //kita pastikan kembali sudah ada tidak id yang kita inginkan di data yang sekarang
        const alreadyJoin = currentJoinCommunity.some(val => String(val.id) === String(id) && val.email === dataSesi.email);

        let updateEvents;
        if(alreadyJoin){
            updateEvents = currentJoinCommunity.filter(val => String(val.id) !== String(id));
        }else{
            updateEvents = [...currentJoinCommunity, newJoinCommunity];
        }

        localStorage.setItem('joinCommunity', JSON.stringify(updateEvents));
        setJoinedCommunity(updateEvents);
    }
  return (
    <>
        <article className="flex flex-col h-full border border-gray-100 shadow-xl rounded-xl overflow-hidden">
            <div className="relative">
                <img
                    src={pict}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
                <div className="flex absolute right-2 top-2 gap-2">
                    <span className={`gap-1 items-center px-3 py-0.1 text-[11px] text-gray-100 font-medium bg-green-500  rounded-full ${isJoined ? 'flex' : 'hidden' }`}> <IoCheckmark className="text-xs"/> Joined</span>
                </div>
            </div>
            <div className="flex flex-col flex-1 p-4">
                <Link to={`/communities/${id}/${slug}`}>
                    <p className="text-md text-gray-900 font-medium">{title}</p>
                    <p className="text-xs text-gray-500 mt-1 flex-1 leading-5">{desc}</p>
                    <div className="flex flex-wrap gap-1 mt-3">
                        {type.map((val) => (
                        <span
                            key={val}
                            className="px-3 py-0.5 text-xs text-amber-500 bg-white/10 border border-gray-400 rounded-full"
                        >
                            {val}
                        </span>
                    ))}
                    </div>

                    <div className="flex flex-wrap text-xs text-gray-500 gap-4 mt-3">
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
                {isJoined ? 
                    (<span className="w-full h-8 mt-4 text-xs flex justify-center items-center bg-green-600 rounded-lg text-gray-100 font-medium cursor-pointer hover:bg-green-700 transition-colors"
                        onClick={handleJoin}
                    >
                        <IoCheckmark /> Joined
                    </span>)

                    :

                    (<span className="w-full h-8 mt-4 text-xs flex justify-center items-center bg-orange-600 rounded-lg text-gray-100 font-medium cursor-pointer hover:bg-orange-700 transition-colors"
                        onClick={handleJoin}
                    >
                        Join Community
                    </span>)
                }
                
            </div>
            
        </article>
    </>
  )
}

export default EventCommunities