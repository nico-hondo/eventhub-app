import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";

function BreadCrumb() {
  return (
    <section className="w-full flex bg-white border-b border-gray-200">
      <div className="px-8 py-4 text-xs text-gray-400">
        <Link to="/events" className="flex justify-center items-center gap-3">
          <FaArrowLeftLong/>
          <p>Back to Events</p>
        </Link>
      </div>    
    </section>
  )
}

export default BreadCrumb