// import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import AuthSidePanel from "../components/AuthSidePanel";
import { useDispatch, useSelector } from 'react-redux';
import { findAttendeeUser, findDefaultUser } from '../validation/handleAuth';
import { loginUser } from '../../../redux/slices/authSlice';

function SignIn() {
    const { register, handleSubmit, setError, formState: {  errors, isSubmitting } } = useForm({
        defaultValues: { email: "", password: "" },
    });
    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const getUser = useSelector((state) => state.registState.registeredUser)

    // console.log(getUser);

    const onSubmit = async (data) => {
        const { email, password } = data;
        const defaultUser = findDefaultUser(email, password);

        const session = defaultUser
            ? {
                nama: defaultUser.nama,
                email: defaultUser.email,
                role: defaultUser.role,
                token: 1,
            }
            : (() => {
                const foundUser = findAttendeeUser(email, password, getUser);
                // console.log(foundUser);
                if (!foundUser) {
                    setError("email", { message: "Email atau password salah" });
                    setError("password", { message: "Email atau password salah" });
                    return null;
                }

                return {
                    nama: foundUser.name,
                    email: foundUser.email,
                    role: foundUser.role || "attendee",
                    token: 1,
                };
            })();

        if (!session) return;

        try {
            await dispatch(loginUser(session)).unwrap();
            navigate("/");
        } catch (err) {
            setError("email", { message: typeof err === "string" ? err : "Login gagal" });
        }
    };
    console.log(errors)
  return (
        <div className="w-full h-screen flex flex-row">
            <AuthSidePanel/>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-5">
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Welcome Back</h3>
                        <p className="text-gray-500 text-xs">Don't have an account? <span className="text-orange-600 font-semibold cursor-pointer"><Link to={"/auth/register"}>Sign up</Link></span></p>
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
                    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)} noValidate>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                            <div>
                                <input
                                    type="text"
                                    id="email"
                                    placeholder="nicohondo01@gmail.com"
                                    className={`w-90 border p-2.5 rounded-lg text-xs focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                    {...register("email", {
                                        required: "Email wajib diisi",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Format email tidak valid",
                                        },
                                    })}
                                />
                                {errors.email && (<p className="text-red-500 text-[11px]">{errors.email.message}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex justify-between items-center">
                                <label htmlFor="password" className="text-sm font-medium text-gray-500">Password</label>
                                <span className="text-orange-500 text-xs font-normal cursor-pointer"><Link to={"/auth/forgot-pass"}>Forgot Password?</Link></span>
                            </div>
                            <div>
                                <input
                                    type="password"
                                    id="password"
                                    placeholder="Your Password"
                                    className={`w-90 border p-2.5 rounded-lg text-xs focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                    {...register("password", {
                                        required: "Password wajib diisi",
                                        minLength: {
                                            value: 6,
                                            message: "Password minimal 6 karakter",
                                        },
                                    })}
                                />
                                {errors.password && (<p className="text-red-500 text-[11px]">{errors.password.message}</p>)}
                            </div>
                        </div>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer disabled:opacity-60"
                        >
                            {isSubmitting ? "Signing in..." : "Sign in"}
                        </button>
                    </form>
                    <p className="text-xs text-gray-400 text-center">Just browsing? <Link to="/" className="underline cursor-pointer">Continue as guest &#8594;</Link></p>
                </div>
            </main>
        </div>
  )
}

export default SignIn