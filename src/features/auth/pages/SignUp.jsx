import { useState, useEffect } from "react";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaCircleNotch } from "react-icons/fa";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import AuthSidePanel from "../components/AuthSidePanel";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { registerThunk } from "../../../redux/slices/registerSlice";

function SignUp() {
    const {register, handleSubmit, setError, formState: { errors, isSubmitting }} = useForm();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);

    const registeredUsers = useSelector((state) => state.registState.registeredUser);

    const onSubmit = async (data) => {
        const { name, email, password, confPass } = data;

        if(password !== confPass){
            setError('confPass', {
                type: 'manual',
                message: 'Password not match',
            });
            return;
        }

        if(registeredUsers.some(user => user.email === email)){
            setError('email', {
                type: 'manual',
                message: 'Email already registered'
            });
            return;
        }

        const newUser = {
            name,
            email,
            password,
        }

        const waitPromise = dispatch(registerThunk(newUser));

        toast.promise(
            waitPromise,{
                pending: "Signing up...",
                success: "Registration Successful",
                error: "Registration Failed",
            },
            {position: "top-right", autoClose: 800}
        )

        try{
            await waitPromise;
            navigate('/auth')
        }catch(err){
            setError('email', {message: err ? err : 'Registration Failed, please try again'});
        }
        
    }

    const process = useSelector(state => state.registState);

    useEffect(() => {
        (() => {
            if(process.isPending){
                setIsLoading(true);
            }else{
                setIsLoading(false);
            }
        })();
    }, [process])

    return (
        <div className="w-full h-screen flex flex-row">
            <div className="hidden lg:flex lg:flex-1">
                <AuthSidePanel/>
            </div>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-4">
                    <div className="flex lg:hidden gap-2 mb-5">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-100 bg-orange-500">E</span>
                        <h1 className="text-xl font-semibold text-gray-800">EventHub</h1>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">
                           Create Your Account
                        </h3>
                        <p className="text-gray-500 text-xs">
                            Already have an account?{" "}
                            <span className="text-orange-600 font-semibold cursor-pointer">
                                <Link to={"/auth"}>Sign in</Link>
                            </span>
                        </p>
                    </div>

                   
                    <div className="w-full flex justify-between gap-2">
                        <div className="w-full flex gap-2 justify-center items-center px-5 py-2 border border-gray-400 rounded-lg cursor-pointer">
                            <FaGoogle className="w-3 h-3"/><span className="text-gray-600 text-xs font-medium">Google</span>
                        </div>
                        <div className="w-full flex gap-2 justify-center items-center px-5 py-2 border border-gray-400 rounded-lg cursor-pointer">
                            <FaGithub className="w-3 h-3"/><span className="text-gray-600 text-xs font-medium">Github</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="h-px bg-gray-200 flex-1"></div>
                        <p className="text-xs text-gray-400">or continue with email</p>
                        <div className="h-px bg-gray-200 flex-1"></div>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-2">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-sm font-medium text-gray-500">Full Name</label>
                            <div>
                                <input type="text" name="name" id="name" placeholder="Nico Hondo" className={`w-90 border p-2.5 rounded-lg text-xs text-gray-700 focus:outline-none ${errors.name ? "border-red-500" : "border-gray-300"}`}
                                {...register('name', {
                                    required: 'Name is required'
                                })}
                                />
                                {errors.name && (<p className="text-red-500 text-[11px]">{errors.name.message}</p>)}
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-medium text-gray-500">
                                Email address
                            </label>
                            <div>
                                <input type="text" name="email" id="email" placeholder= "nicohondo01@gmail.com" className={`w-90 border p-2.5 rounded-lg text-xs text-gray-700 focus:outline-none ${errors.email ? "border-red-500" : "border-gray-300"}`}
                                {...register('email', {
                                    required: 'Email is required',
                                })}
                                />
                                {errors.email && (<p className="text-red-500 text-[11px]">{errors.email.message}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="pass" className="text-sm font-medium text-gray-500">Password</label>
                            <div>
                                <div className="w-full relative flex justify-between">
                                    <input 
                                        type={showPassword ? "text" : "password"} 
                                        name="password" 
                                        id="pass" 
                                        placeholder="At least 8 characters" 
                                        className={`w-90 border p-2.5 rounded-lg text-xs text-gray-700 focus:outline-none ${errors.password ? "border-red-500" : "border-gray-300"}`}
                                        {...register('password', {
                                            required: 'New Password is required',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be a minimal 6 characters',
                                            },
                                        })}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                                        {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                    </button>
                                </div>
                                {errors.password && (<p className="text-red-500 text-[11px]">{errors.password.message}</p>)}
                            </div>
                        </div>
                        <div className="grid gap-2">
                            <label htmlFor="confpass" className="text-sm font-medium text-gray-500">Confirm Password</label>
                            <div>
                                <div className="w-full relative flex justify-between">
                                    <input 
                                        type={showConfPassword ? "text" : "password"} 
                                        name="confpass" 
                                        id="confpass" 
                                        placeholder="Re-enter your password" 
                                        className={`w-90 border p-2.5 rounded-lg text-xs text-gray-700 focus:outline-none ${errors.confPass ? "border-red-500" : "border-gray-300"}`}
                                        {...register('confPass', {
                                            required: 'Please confirm your password',
                                            minLength: {
                                                value: 6,
                                                message: 'Password must be a minimal 6 characters',
                                            }
                                        })}
                                    />
                                    <button type="button" onClick={() => setShowConfPassword(!showConfPassword)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                                        {showConfPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                    </button>
                                </div>
                                {errors.confPass && (<p className="text-red-500 text-[11px]">{errors.confPass.message}</p>)}
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                            type="checkbox"
                            name="terms"
                            id="terms"
                            className="
                                appearance-none 
                                w-3 h-3 
                                rounded 
                                border-2 border-gray-400
                                bg-gray-200 
                                checked:bg-orange-600
                                checked:border-orange-600 
                                cursor-pointer
                                relative
                                after:content-['']
                                after:absolute
                                after:left-0.75 after:top-px
                                after:w-1 after:h-1.5
                                after:border-r-2 after:border-b-2
                                after:border-white
                                after:rotate-45
                                after:opacity-0
                                checked:after:opacity-100
                                after:transition-opacity
                            "
                            {...register('accTerms', {
                                required: 'Must accept our terms and condition'
                            })}
                            />
                            <label htmlFor="terms" className="text-xs">
                                I agree to the <span className="text-orange-500 cursor-pointer">Terms of Service</span> and <span className="text-orange-600 cursor-pointer">Privacy Policy</span>
                            </label>
                        </div>
                        {errors.accTerms && (<p className="text-red-500 text-[11px]">{errors.accTerms.message}</p>)}
                        <button 
                            type="submit"
                            disabled={isSubmitting} 
                            className="w-full p-2.5 bg-orange-600 text-sm font-medium text-white rounded-lg cursor-pointer">
                                {isLoading ? <FaCircleNotch className="animate-spin mx-auto" /> : "Create Account"}
                        </button>
                    </form>
                </div>
            </main>
            {/* <Alert errors={error} close={() => setError({})}/> */}
        </div>
    )
}

export default SignUp