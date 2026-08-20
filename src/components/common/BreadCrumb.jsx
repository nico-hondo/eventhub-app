import { FaArrowLeftLong } from "react-icons/fa6";
import { Link } from "react-router";

function BreadCrumb({isString}) {
  return (
    <section className="w-full flex sticky top-15 z-20 bg-white border-b border-gray-200">
      <div className="px-8 py-4 text-xs text-gray-400">
        <Link to={`/${isString}`} className="flex justify-center items-center gap-3">
          <FaArrowLeftLong/>
          <p>Back to {isString}</p>
        </Link>
      </div>    
    </section>
  )
}

export default BreadCrumb