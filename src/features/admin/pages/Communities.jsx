import { SlOptions } from "react-icons/sl";
import communities from '../../../data/communities.json';

function Communities() {
    
    return(
        <section className="w-full flex flex-col items-center gap-6">
                <div className="w-full max-w-5xl flex-1 flex flex-col gap-2 pb-4">
                  {communities.map((val) => {
                    return(
                      <div className="w-full flex justify-between items-center p-3 border border-gray-200 bg-white rounded-lg">
                        <div className="flex items-center gap-3">
                          <img src={val.banner_url} alt={val.title} className="w-12 h-10 rounded-lg object-cover"/>
                          <div className="flex flex-col"><p className="text-sm font-medium text-gray-900">{val.name}</p>
                            <div className="flex gap-2 items-center text-xs">
                                <span className="text-xs text-gray-400">{val.member_count}</span>
                                • 
                                <span className=" text-xs text-gray-400">{val.upcoming_events_count} upcoming events</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="bg-green-200 text-green-600 text-[11px] rounded-lg px-2">active</span>
                         
                          <SlOptions className="cursor-pointer"/>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </section>
    )
}

export default Communities;