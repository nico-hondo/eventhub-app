import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import AuthSidePanel from "../components/AuthSidePanel";
import handleLogin from '../validation/handleLogin';

function SignIn() {
    const [validate, setValidate] = useState("");
    const navigate = useNavigate();
  return (
        <div className="w-full h-screen flex flex-row">
            <AuthSidePanel/>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-5">
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Welcome Back</h3>
                        <p className="text-gray-500 text-xs">Don't have an account? <span className="text-orange-600 font-semibold cursor-pointer"><Link to={"/auth/sign-up"}>Sign up</Link></span></p>
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
                    <form className="grid gap-4"
                        onSubmit = {(e) => {
                            e.preventDefault();

                            const email = e.target.email.value;
                            const pass = e.target.password.value;

                            const user = {email, pass};

                            //kita get data dari local
                            const getUser = JSON.parse(localStorage.getItem('users') || []);

                            const err = handleLogin(user, getUser);

                            setValidate(err);

                            if(Object.keys(err).length > 0){
                                console.log(err);
                                return;
                            }

                            const foundUser = getUser.find(
                                (item) => item.email === email
                            )

                            const session = {
                                nama: foundUser.nama,
                                email: foundUser.email,
                                role: foundUser.role,
                                token: 1,
                            }

                            localStorage.setItem('session', JSON.stringify(session));
                            console.log(session);

                            e.target.reset();
                            
                            navigate('/');
                        }}
                    >
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                            <div>
                                <input type="text" name="email" id="email" placeholder="nicohondo01@gmail.com" className={`w-90 border p-2.5 rounded-lg text-xs ${validate.email ? "border-red-500" : "border-gray-300"}`}/>
                                {validate.email && (<p className="text-red-500 text-[11px]">{validate.email}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="pass" className="text-sm font-medium text-gray-500">Password</label>
                                <span className="text-orange-500 text-xs font-normal cursor-pointer"><Link to={"/auth/forgot-pass"}>Forgot Password?</Link></span>
                            </div>
                            <div>
                                <input type="password" name="password" id="pass" placeholder="Your Password" className={`w-90 border p-2.5 rounded-lg text-xs ${validate.pass ? "border-red-500" : "border-gray-300"}`}/>
                                {validate.pass && (<p className="text-red-500 text-[11px]">{validate.pass}</p>)}
                            </div>
                        </div>
                        <button type="submit" className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer">Sign in</button>
                    </form>
                    <p className="text-xs text-gray-400 text-center">Just browsing? <span className="underline cursor-pointer">Continue as guest &#8594;</span></p>
                </div>
            </main>
        </div>
  )
}

export default SignIn