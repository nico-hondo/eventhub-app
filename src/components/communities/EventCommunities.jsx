import { Link } from "react-router";
import slugify from 'slugify';

import { CiCalendar } from "react-icons/ci";
import { IoPeopleOutline } from "react-icons/io5";

function EventCommunities({id,title, desc, type, member, agenda, pict}) {
    const slug = slugify(title, {
        lower: true,
        strict: true
    })
  return (
    <>
        <article className="flex flex-col h-full border border-gray-100 shadow-xl rounded-xl overflow-hidden">
            <Link to={`/communities/${id}/${slug}`}>
                <img
                    src={pict}
                    alt={title}
                    className="w-full h-40 object-cover"
                />
                <div className="flex flex-col flex-1 p-4">
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

                    <span className="w-full h-8 mt-4 text-xs flex justify-center items-center bg-orange-600 rounded-lg text-gray-100 font-medium cursor-pointer hover:bg-orange-700 transition-colors">
                        Join Event
                    </span>
                </div>
            </Link>
        </article>
    </>
  )
}

export default EventCommunities