import { HiOutlineSparkles } from "react-icons/hi2";
import { BsFillSearchHeartFill } from "react-icons/bs";
import { Button } from "../../../components/common/Button";

function Hero() {

    const typeEvent = ['Technology', 'AI', 'Design', 'Business', 'Programming', 'Music'];

  return (
    <>
        <section className="w-full min-h-120 flex justify-center items-center bg-radial from-orange-900 from-2% to-black">
            <div className="max-w-2xl flex-1 flex flex-col justify-center items-center gap-10 my-auto">
                <p className="flex items-center text-center gap-2 text-orange-400 p-2 border border-orange-400 rounded-full bg-orange-700/30 w-fit text-xs"><HiOutlineSparkles/> Discover <span className="text-[8px]">●</span> Connect <span className="text-[8px]">●</span> Participate</p>
                <div className="w-full text-center flex flex-col gap-4">
                    <h2 className="text-6xl font-bold text-white leading-17">Find events that<br/> <span className="text-orange-600">actually matter</span> to you</h2>
                    <p className="text-sm">Join workshops, conferences, and meetups in Indonesia's best tech <br/>communities — or create your own.</p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <form className="relative">
                        <BsFillSearchHeartFill className="absolute inset-y-2.5 left-3 text-lg font-bold text-gray-600"/>
                        <input type="text" className="w-full h-10 bg-white rounded-lg px-10 text-sm" placeholder="Search events, topics, or locations..."></input>
                        <Button isValue={"search"}/>
                    </form>
                    <div className="flex gap-2 justify-center items-center">
                        {typeEvent.map((val) => {
                            return(
                                <span key={val} className="text-xs px-3 py-0.5 border divide-dashed border-gray-600 rounded-full cursor-pointer">{val}</span>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Hero