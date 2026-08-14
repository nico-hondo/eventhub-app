import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function SignUp() {
  return (
        <div className="w-full h-screen flex flex-row">
            <aside className="w-full h-full flex-1 bg-black text-white ">
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
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-4">
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Create Your Account</h3>
                        <p className="text-gray-500 text-xs">Already have an account? <span className="text-orange-600 font-semibold cursor-pointer">Sign in</span></p>
                    </div>
                    <div className="w-full flex justify-between gap-2">
                        <div className="w-full flex gap-2 justify-center items-center px-5 py-2 border border-gray-400 rounded-lg cursor-pointer"><FaGoogle className="w-3 h-3"/><span className="text-gray-600 text-xs font-medium">Google</span></div>
                        <div className="w-full flex gap-2 justify-center items-center px-5 py-2 border border-gray-400 rounded-lg cursor-pointer"><FaGithub className="w-3 h-3"/><span className="text-gray-600 text-xs font-medium">Github</span></div>
                    </div>
                     <div className="flex items-center gap-3">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <p className="text-xs text-gray-400">or continue with email</p>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>
                    <form className="grid gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-500">Full Name</label>
                            <input type="text" name="name" id="name" placeholder="Nico Hondo" className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                            <input type="text" name="email" id="email" placeholder="nicohondo01@gmail.com" className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs"/>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="pass" className="text-sm font-medium text-gray-500">Password</label>
                            <div>
                                <input type="password" name="pass" id="pass" placeholder="At least 8 characters" className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs"/>
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="pass" className="text-sm font-medium text-gray-500">Confirm Password</label>
                            <div>
                                <input type="password" name="pass" id="pass" placeholder="Re-enter your password" className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs"/>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="terms" id="terms" className="bg-transparent"/> <label htmlFor="terms" className="text-xs">I agree to the <span className="text-orange-500 cursor-pointer">Terms of Service</span> and <span className="text-orange-600 cursor-pointer">Privacy Policy</span></label>
                        </div>
                        <button type="submit" className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer">Create Account</button>
                    </form>
                </div>
            </main>
        </div>
  )
}

export default SignUp