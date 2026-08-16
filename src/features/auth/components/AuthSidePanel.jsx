

function AuthSidePanel() {
  return (
    <aside className="w-full h-full flex-1 bg-linear-to-tr from-orange-900 from-2% to-black text-white ">
        <div className="h-full p-8 flex flex-col justify-between">
            <div className="flex gap-2">
                <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 bg-orange-500">E</span>
                <h1 className="text-xl font-medium">EventHub</h1>
            </div>
            <div className="flex flex-col gap-5">
                <h2 className="text-4xl font-medium">Discover events that shape careers.</h2>
                <p className="text-gray-500 text-sm">Workshops, conferences, and community meetups from Indonesia's most active tech communities - all in one place</p> 
                <div className="grid gap-2 px-5 py-3 bg-[#1a1a1a] rounded-xl">
                    <p className="text-gray-400 text-xs">"Found my last three workshops here. The community is fantastic."</p>
                    <div className="flex items-center gap-2">
                        <img src="/img/avatar-girl.jpg" alt="Avatar Dina" className="h-8 w-8 rounded-full object-cover"/>
                        <div className="grid">
                            <span className="font-medium text-sm">Dina Rahayu</span>
                            <p className="text-gray-500 text-xs">Backend Lead, Cakrawala Digital.</p>
                        </div>
                    </div>
                </div>
                <div className="grid gap-2 px-5 py-3 bg-[#1a1a1a] rounded-xl">
                    <p className="text-gray-400 text-xs">"EventHub is where Jakarta's tech scene actually happens."</p>
                    <div className="flex items-center gap-2">
                        <img src="/img/avatar-boy.jpg" alt="Avatar Kevin" className="h-8 w-8 rounded-full object-cover"/>
                        <div className="grid">
                            <span className="font-medium text-xs">Kevin Santoso</span>
                            <p className="text-gray-500 text-xs">ML Engineer, Nusantara Labs.</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-medium">12K+</span>
                        <span className="text-xs text-gray-500">Members</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-medium">200+</span>
                        <span className="text-xs text-gray-500">Events/year</span>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <span className="font-medium">50+</span>
                        <span className="text-xs text-gray-500">Communities</span>
                    </div>
                </div>
            </div>
            <small className="text-gray-500">&copy; 2026 EventHub <span className="text-[10px]">•</span> Indonesia</small>
        </div>
    </aside>
  )
}

export default AuthSidePanel