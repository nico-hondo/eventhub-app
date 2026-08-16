import AuthSidePanel from "../components/AuthSidePanel"

function ForgotPass() {
  return (
        <div className="w-full h-screen flex flex-row">
            <AuthSidePanel/>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-5">
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Reset Your Password</h3>
                        <p className="text-gray-500 text-xs">Enter your email and we'll send a link.</p>
                    </div>
                    <form className="grid gap-4">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                            <input type="text" name="email" id="email" placeholder="nicohondo01@gmail.com" className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs"/>
                        </div>
                        
                        <button type="submit" className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer">Send Reset Link</button>
                    </form>
                </div>
            </main>
        </div>
  )
}

export default ForgotPass