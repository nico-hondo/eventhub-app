import { IoBookmark } from "react-icons/io5";

function SavedEvent() {
  return (
    <section className="w-full min-h-100 flex justify-center items-center py-6">
      <div className="max-w-3xl flex-1 flex flex-col justify-center items-center gap-6">
        <IoBookmark className="text-gray-900 text-4xl"/>
        <div className="flex flex-col text-xs gap-1 text-center">
          <p className="text-gray-800 font-medium">No Saved Events</p>
          <p className="text-gray-400">Bookmark events you're interested in.</p>
        </div>
        <span className="px-6 py-2.5 text-xs text-gray-200 font-medium bg-orange-600 rounded-lg cursor-pointer">Explore Events</span>
      </div>
    </section>
  )
}

export default SavedEvent