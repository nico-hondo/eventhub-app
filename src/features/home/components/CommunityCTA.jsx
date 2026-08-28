function CommunityCTA({theme}) {
  return (
    <>
        <section className="w-full min-h-75 flex justify-center items-center">
            <div className={`max-w-6xl flex-1 flex justify-center items-center ${theme === 'light' ? 'bg-black' : 'bg-gray-800'} rounded-xl`}>
                <div className="max-w-2xl flex flex-col justify-center items-center gap-4 my-8">
                    <div className="flex gap-2 text-xs font-medium">
                        <div className="w-20 h-7 flex justify-center items-center text-blue-700 bg-blue-600/20 rounded-full">
                            <span>Technology</span>
                        </div>
                        <div className="w-10 h-7 flex justify-center items-center text-blue-700 bg-blue-600/20 rounded-full">
                            <span>AI</span>
                        </div>
                        <div className="w-20 h-7 flex justify-center items-center text-purple-800 bg-white p-3 rounded-full">
                            <span>Design</span>
                        </div>
                    </div>
                    <h2 className="text-3xl text-white font-semibold">Ready to find your community?</h2>
                    <p className="text-xs text-gray-400 text-center">Join thousands of developers, designers, and makers in Indonesia's <span className="block">most active tech communities.</span></p>
                    <div className="flex gap-3 text-sm font-medium">
                        <span className="text-gray-200 bg-orange-600 rounded-lg px-5 py-3 cursor-pointer">Explore Events</span>
                        <span className={`border ${theme === 'light' ? 'border-gray-400' : 'border-gray-600'} rounded-lg text-gray-200 px-5 py-3 cursor-pointer`}>Browse Communities</span>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default CommunityCTA