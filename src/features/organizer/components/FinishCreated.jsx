import { IoCheckmark } from "react-icons/io5";

function FinishCreated() {
  return (
    <>
    <section className="w-full h-120 flex justify-center items-center pt-2 pb-4">
        <div className="max-w-4xl flex-1 flex flex-col justify-center items-center gap-6">
            <div className="w-12 h-12 flex justify-center items-center text-lg text-green-800 font-bold bg-green-100 rounded-full">
                <IoCheckmark/>
            </div>
            <div className="flex flex-col justify-center items-center gap-1">
                <h2 className="text-lg text-gray-900 font-semibold">Event Created!</h2>
                <p className="text-xs text-gray-400 ">Redirecting to your dashboard...</p>
            </div>
        </div>
    </section>
    </>
  )
}

export default FinishCreated