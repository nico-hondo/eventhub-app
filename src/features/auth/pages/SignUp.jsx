import { useState } from "react";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import AuthSidePanel from "../components/AuthSidePanel";
import { Link } from "react-router"
import validateRegister from "../validation/registerValidation";
import Alert from "../components/Alert";

function SignUp() {
    const [error, setError] = useState("");

  return (
        <div className="w-full h-screen flex flex-row">
            <AuthSidePanel/>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-4">
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Create Your Account</h3>
                        <p className="text-gray-500 text-xs">Already have an account? <span className="text-orange-600 font-semibold cursor-pointer"><Link to={"/auth"}>Sign in</Link></span></p>
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
                    <form 
                        onSubmit={(e) => {
                            e.preventDefault();
                           
                                const nama = e.target.name.value;
                                const email = e.target.email.value;
                                const pass = e.target.password.value;
                                const confPass = e.target.confpass.value;
                                const useTerms = e.target.terms.checked;

                                const objUser = {nama, email, pass, confPass, useTerms};
                                
                                const err = validateRegister(objUser);
                                
                                setError(err);

                                if(Object.keys(err).length > 0){
                                    console.log(err);
                                    return;
                                }

                                //kalau sudah masuk localStorage, maka validasi lolos
                                const localUser = JSON.parse(localStorage.getItem("signUp"))

                                if(!localUser){
                                    localStorage.setItem("signUp", JSON.stringify([objUser]));
                                }else{
                                    const addUser = [...localUser, objUser];

                                    localStorage.setItem("signUp", JSON.stringify(addUser));
                                }
                            
                                e.target.reset();
                        }}
                    className="grid gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-500">Full Name</label>
                            <div >
                                <input type="text" name="name" id="name" placeholder="Nico Hondo" className={`w-90 border p-2.5 rounded-lg text-xs text-gray-700 ${error.nama ? "border-red-500" : "border-gray-300"}`}/>
                                {error.nama && (<p className="text-red-500 text-[11px]">{error.nama}</p>)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                            <div>
                                <input type="text" name="email" id="email" placeholder="nicohondo01@gmail.com" className={`w-90 border border-gray-300 p-2.5 rounded-lg text-xs text-gray-700 ${error.email ? "border-red-500" : "border-gray-300"}`}/>
                                {error.email && (<p className="text-red-500 text-[11px]">{error.email}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="pass" className="text-sm font-medium text-gray-500">Password</label>
                            <div>
                                <input type="password" name="password" id="pass" placeholder="At least 8 characters" className={`w-90 border border-gray-300 p-2.5 rounded-lg text-xs text-gray-700 ${error.pass ? "border-red-500" : "border-gray-300"}`}/>
                                {error.pass && (<p className="text-red-500 text-[11px]">{error.pass}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="pass" className="text-sm font-medium text-gray-500">Confirm Password</label>
                            <div>
                                <input type="password" name="confpass" id="pass" placeholder="Re-enter your password" className={`w-90 border border-gray-300 p-2.5 rounded-lg text-xs text-gray-700 ${error.pass ? "border-red-500" : "border-gray-300"}`}/>
                                {error.pass && (<p className="text-red-500 text-[11px]">{error.pass}</p>)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="terms" id="terms" className="bg-transparent"/> <label htmlFor="terms" className="text-xs">I agree to the <span className="text-orange-500 cursor-pointer">Terms of Service</span> and <span className="text-orange-600 cursor-pointer">Privacy Policy</span></label>
                        </div>
                        <button type="submit" className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer">Create Account</button>
                    </form>
                </div>
            </main>
            <Alert errors={error} close={() => setError({})}/>
        </div>
  )
}

export default SignUp