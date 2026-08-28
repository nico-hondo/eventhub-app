import { FiUsers } from "react-icons/fi";
import { IoCalendarOutline } from "react-icons/io5";
import { IoFlagOutline } from "react-icons/io5";

function Overview() {
    const recent = [
        {activity: '284 new users registered this month', time: 'today', type: 'group'},
        {activity: 'AI Product Design Summit reached 234 registrations', time: '2h ago', type: 'update'},
        {activity: '3 new organizer applications received', time: '5h ago', type: 'application'},
        {activity: 'Jakarta AI & ML Club crossed 2000 members', time: '1d ago', type: 'group'},
    ]
    return (
        <section className="w-full flex flex-col items-center gap-6">
          <div className="w-full max-w-5xl flex-1 flex flex-col gap-5">
            <div className="w-full grid grid-cols-4 gap-3">
                <div className="border border-gray-200 bg-white flex flex-col gap-4 p-4 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center text-xs font-medium">
                        <span className="uppercase text-gray-600 text">total users</span>
                        <FiUsers/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl text-gray-900 font-semibold">12841</p>
                      <span className="text-xs text-gray-400">+284 this month</span>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white flex flex-col gap-4 p-4 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center text-xs font-medium">
                        <span className="uppercase text-gray-600 text">total events</span>
                        <IoCalendarOutline/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl text-gray-900 font-semibold">12</p>
                      <span className="text-xs text-gray-400">8 upcoming</span>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white flex flex-col gap-4 p-4 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center text-xs font-medium">
                        <span className="uppercase text-gray-600 text">communities</span>
                        <FiUsers/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl text-gray-900 font-semibold">8</p>
                      <span className="text-xs text-gray-400">All active</span>
                    </div>
                </div>
                <div className="border border-gray-200 bg-white flex flex-col gap-4 p-4 rounded-xl shadow-lg">
                    <div className="flex justify-between items-center text-xs font-medium">
                        <span className="uppercase text-gray-600 text">avg fill rate</span>
                        <IoFlagOutline/>
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-2xl text-gray-900 font-semibold">74%</p>
                      <span className="text-xs text-gray-400">Across all events</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col gap-4 border border-gray-200 bg-white rounded-xl p-4">
              <p className="text xs text-gray-900 font-semibold">Recent Platform Activity</p>
              <div className="flex flex-col gap-2">
                  {recent.map((val) => {
                    return(
                        <div className="flex justify-between items-center  text-xs">
                            <div className="flex items-center gap-3">
                                {val.type === "group" ? <FiUsers className="text-green-600"/> : val.type === 'update' ? <IoCalendarOutline className="text-blue-600"/> : <IoFlagOutline className="text-orange-600"/>}
                                <p className="text-gray-700 capitalize">{val.activity}</p>
                            </div>
                            <span className="text-gray-400 capitalize text-[12px]">{val.time}</span>
                        </div>
                    )
                  })}
              </div>
            </div>
          </div>
        </section>
    )
}

export default Overview