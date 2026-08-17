import { useEffect, useRef } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
        <div ref={modalRef} className={`w-40 flex flex-col gap-3 border border-gray-200 rounded-xl px-4 py-3 absolute top-12 right-7 z-60 bg-gray-400 shadow-md`}> 
            <span className="flex items-center gap-2 text-xs text-gray-100 font-medium cursor-pointer"><CgProfile/> {session.nama}</span>
            <span onClick={onLogout} className="flex items-center gap-2 text-xs text-gray-100 font-medium cursor-pointer"><MdOutlineLogout className="text-sm"/>Logout</span>
        </div>  
    )
}

export default ModalIcon