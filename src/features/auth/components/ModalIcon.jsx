import { useEffect, useRef } from "react";
import { Link } from "react-router";

function ModalIcon({session, onClose, onLogout}) {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose]);

    return (
        <div ref={modalRef} className={`w-40 flex flex-col gap-3 border border-gray-300 rounded-xl px-4 py-4 absolute top-12 right-7 z-60 bg-white shadow-md`}> 
            <div className="w-full border-b border-gray-200 pb-2 flex flex-col cursor-pointer">
                <span className="text-[15px] text-gray-900 font-bold leading-1 pt-2">{session.nama}</span>
                <span className="text-[13px] text-gray-400">{session.email}</span>
            </div>
            <div className="w-full border-b border-gray-200 pb-2 flex flex-col cursor-pointer">
                <Link to="profile">
                    <span className="text-xs font-bold text-gray-900">My Profile</span>
                </Link>
            </div>
            <span onClick={onLogout} className="flex items-center gap-2 text-xs text-red-500 font-bold cursor-pointer">Logout</span>
        </div>  
    )
}

export default ModalIcon