import { useState, useContext } from 'react';
import notification from '../../../data/notification.json';

import { IoCalendarClearOutline } from "react-icons/io5";
import { TiBell } from "react-icons/ti";
import { FiUsers } from "react-icons/fi";
import { GrSend } from "react-icons/gr";
import { IoChatboxOutline } from "react-icons/io5";
import themeContext from '../../../context/theme/themeContext';

// helper: tentukan icon & warna bg berdasarkan adds-on
function getNotifIcon(type) {
    switch (type) {
        case 'reminder':
            return { icon: <IoCalendarClearOutline className="text-orange-600 font-medium" />, bg: 'bg-amber-300/30' };
        case 'welcome':
            return { icon: <TiBell className="text-green-600 font-medium" />, bg: 'bg-green-300/30' };
        case 'group':
            return { icon: <FiUsers className="text-blue-600 font-medium" />, bg: 'bg-blue-300/30' };
        case 'update':
            return { icon: <GrSend className="text-orange-600 font-medium" />, bg: 'bg-orange-300/30' };
        default:
            return { icon: <IoChatboxOutline className="text-violet-600 font-medium" />, bg: 'bg-violet-300/30' };
    }
}

function UnReadNotif() {
    const [unRead] = useState(() => {
        return notification.filter(val => val.status === 'unread');
    });
   
    const {theme} = useContext(themeContext);
    return (
        <div className={`max-w-4xl flex-1 flex flex-col overflow-y-auto whitespace-nowrap border ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'} shadow-md rounded-lg gap-2.5`}>
            {unRead.map((val, index) => {
                const { icon, bg } = getNotifIcon(val['adds-on']);

                return (
                    <article key={index} className={`flex justify-between items-center px-8 py-4 cursor-pointer border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}>
                        <div className="flex gap-4">
                            <div className={`w-10 h-10 flex justify-center items-center text-md ${bg} rounded-lg`}>
                                {icon}
                            </div>
                            <div className="flex flex-col">
                                <h3 className={`text-md ${theme === 'light' ? 'text-gray-900' : 'text-gray-200'} ${val.status === "unread" ? 'font-medium' : 'font-normal'}`}>
                                    {val.title}
                                </h3>
                                <p className="text-xs text-gray-500">{val.desc}</p>
                            </div>
                        </div>
                        <div className="flex justify-center items-center gap-2">
                            <span className="text-xs text-gray-400">{val.publish}</span>
                            <span className={`w-1.5 h-1.5 bg-orange-600 rounded-full ${val.status === 'unread' ? 'block' : 'hidden'}`}></span>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}

export default UnReadNotif;