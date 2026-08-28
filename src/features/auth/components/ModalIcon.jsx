import { useEffect, useRef } from "react";
import { Link } from "react-router";

import { FaRegUser } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";

function ModalIcon({session, onClose, onLogout, excludeRef}) {
    const modalRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            const clickedInsideModal = modalRef.current && modalRef.current.contains(e.target);
            const clickedTrigger = excludeRef?.current && excludeRef.current.contains(e.target);

            if (!clickedInsideModal && !clickedTrigger) {
                onClose();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [onClose, excludeRef]);

    return (
        <div ref={modalRef} className={`w-40 flex flex-col gap-3 border border-gray-300 rounded-xl px-4 py-4 fixed top-12 right-7 z-60 bg-white shadow-md`}> 
            <div className="w-full border-b border-gray-200 pb-2 flex flex-col cursor-pointer">
                <span className="text-[15px] text-gray-900 font-bold leading-1 pt-2">{session.nama}</span>
                <span className="text-[13px] text-gray-400">{session.email}</span>
                <span className="px-3 py- bg-orange-400 w-fit rounded-lg text-[12px] text-orange-100 capitalize">{session.role}</span>
            </div>
            <div className="w-full border-b border-gray-200 pb-2 text-xs text-gray-500 flex items-center gap-2 cursor-pointer">
                <FaRegUser/>
                <Link to="profile" 
                    onClick={onClose}
                >
                    <span className="text-xs font-medium text-gray-900">My Profile</span>
                </Link>
            </div>
            <span onClick={onLogout} className="flex items-center gap-2 text-xs text-red-500 font-bold cursor-pointer">
                <MdLogout/>
                Logout
            </span>
        </div>  
    )
}

export default ModalIcon