import { NavLink, Outlet } from "react-router"

function DetailLayout({data}) {
    return (
        <section className="w-full flex flex-col justify-center items-center">
            <div className="w-full relative">
                <img src={data.banner_url} alt={data.name} className="w-full h-100 object-cover"/>
                <div className="w-full flex justify-between items-center absolute bottom-10 px-20">
                    <div className="flex-1 flex flex-col gap-1">
                        <h2 className="text-3xl text-gray-100 font-medium">{data.name}</h2>
                        <div className="flex gap-4 text-xs text-gray-300">
                            <p>{data.member_count} members</p>
                            <p>{data.upcoming_events_count} upcoming events</p>
                        </div>
                    </div>
                    <div className="">
                        <span className="px-5 py-2 bg-orange-600 text-gray-200 text-xs font-medium rounded-lg">Join Community</span>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="max-w-6xl flex-1 flex px-7 py-4 border border-gray-200 rounded-xl mt-5 shadow-lg">
                    <div className="w-full flex flex-col gap-2">
                        <p className="text-xs text-gray-400">{data.description}</p>
                        <div className="flex gap-3">
                            {data.tags.map((val) => {
                                return(
                                    <span key={val} className="px-3 py-0.5 bg-orange-600 rounded-full text-xs text-white">{val}</span>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <div className="max-w-6xl flex-1 flex py-4 rounded-xl mt-5">
                    <div className="w-full flex gap-2 text-xs border-b border-gray-200">
                        <NavLink
                            end
                            to=""
                            className={({ isActive }) =>
                            `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
                            }
                        >
                            Events
                        </NavLink>
                        <NavLink
                            end
                            to="members"
                            className={({ isActive }) =>
                            `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
                            }
                        >
                            Members
                        </NavLink>
                        <NavLink
                        end
                        to="discuss"
                        className={({ isActive }) =>
                        `${isActive ? "text-orange-600 border-b border-orange-600 px-4 py-2 font-medium cursor-pointer" : "px-4 py-2 font-medium cursor-pointer"}`
                        }
                        >
                            Discussion
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className="w-full flex justify-center">
                <Outlet/>
            </div>
        </section>       
    )
}

export default DetailLayout