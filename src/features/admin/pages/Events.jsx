import { convertDate } from '../../../components/utils/utilitas';
import { SlOptions } from "react-icons/sl";
import events from '../../../data/events.json';

function Events() {
  return (
      <section className="w-full flex flex-col items-center gap-6">
        <div className="w-full max-w-5xl flex-1 flex flex-col gap-2 pb-4">
          {events.map((val) => {
            const percentage = (val.attendees_count/val.capacity) * 100;
            console.log(percentage === val.capacity);
            return(
              <div className="w-full flex justify-between items-center p-3 border border-gray-200 bg-white rounded-lg">
                <div className="flex items-center gap-3">
                  <img src={val.image_url} alt={val.title} className="w-12 h-10 rounded-lg object-cover"/>
                  <div className="flex flex-col"><p className="text-sm font-medium text-gray-900">{val.title}</p><span className="flex items-center gap-2 text-xs text-gray-400">{convertDate(val.date)} • {val.location}</span></div>
                </div>
                <div className="flex items-center gap-3 text-xs text-gray-400">
                  <span>{val.attendees_count}/{val.capacity}</span>
                  <span className={`text-[12px] px-2 rounded-lg ${val.attendees_count === val.capacity ? 'text-red-600 bg-red-200' : percentage >= 80 ? 'text-green-600 bg-green-200' : 'text-green-600 bg-green-200'}`}>{val.attendees_count === val.capacity ? 'full' : percentage >= 80 ? 'almost-full' : 'available'}</span>
                  <SlOptions className="cursor-pointer"/>
                </div>
              </div>
            )
          })}
        </div>
      </section>
  )
}

export default Events