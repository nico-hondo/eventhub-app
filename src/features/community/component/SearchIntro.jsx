import { BsFillSearchHeartFill } from "react-icons/bs";

function SearchIntro() {
  return (
        <section className="w-full min-h-70 flex justify-center items-center bg-black">
            <div className="max-w-2xl flex-1 flex flex-col justify-center items-center gap-10">
                <div className="w-full text-center flex flex-col">
                    <h2 className="text-4xl font-bold text-white leading-17">Explore Communities</h2>
                    <p className="text-sm">Join communities that match your interests and get personalized event recommendations.</p>
                </div>
                <div className="w-full flex flex-col gap-4">
                    <form className="relative">
                        <BsFillSearchHeartFill className="absolute inset-y-2.5 left-3 text-lg font-bold text-gray-600"/>
                        <input type="text" className="w-full h-10 bg-white rounded-lg px-10 text-sm focus:outline-none" placeholder="Search Communities"></input>
                    </form>
                </div>
            </div>
        </section>
  )
}

export default SearchIntro