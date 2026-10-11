import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import AuthSidePanel from "../components/AuthSidePanel";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import { toast } from "react-toastify";
import { forgotPasswordThunk } from "../../../redux/slices/forgotPassSlice";
import { resetPasswordThunk } from "../../../redux/slices/registerSlice";

function ForgotPass() {
    const { register, setError,  handleSubmit } = useForm();
    const [email, setEmail] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfPassword, setShowConfPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isPending, isFulfilled, isRejected, error } = useSelector(
        (state) => state.forgotPasswordState
    );

    useEffect(() => {
        return () => dispatch(resetPasswordThunk());
    }, [dispatch]);

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(forgotPasswordThunk(email));
    };

    const onResetPassword = async (data) => {
        const { newpass, confirmnewpass } = data;
        
        if (newpass !== confirmnewpass) {
            setError('confirmnewpass', 'newpass', { type: 'manual', message: "Passwords do not match" });
            return;
        }
        const waitPromise = dispatch(resetPasswordThunk({newPass: newpass}));

        toast.promise(
            waitPromise,{
                pending: "Resetting password...",
                success: "Reset Password Successful",
                error: "Reset Password Failed",
            },
            {position: "top-right", autoClose: 800}
        )

        try{
            await waitPromise;
            navigate("/auth");
        }catch(err){
            setError('newpass', { type: 'manual', message: err.message || "Reset Password Failed" });
        }
    }

    return (
        <div className="w-full h-screen flex flex-row">
            <div className="hidden lg:flex lg:flex-1">
                <AuthSidePanel />
            </div>
            <main className="w-full h-full flex-2 flex justify-center items-center">
                <div className="max-w-5xl grid gap-5">
                    <div className="flex lg:hidden gap-2 mb-5">
                        <span className="rounded-lg text-center font-medium text-md px-2.5 py-0.5 text-gray-100 bg-orange-500">E</span>
                        <h1 className="text-xl font-semibold text-gray-800">EventHub</h1>
                    </div>
                    <div className="grid gap-2">
                        <h3 className="font-medium text-2xl text-bold text-black">Reset Your Password</h3>
                        <p className="text-gray-500 text-xs">{isFulfilled ? "Enter your new password" : "Enter your email and we'll send a link."}</p>
                    </div>
                
                    {isFulfilled ? (
                        <form onSubmit={handleSubmit(onResetPassword)} className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label htmlFor="newpass" className="text-sm text-gray-500">New Password</label>
                                <div className="w-full relative flex justify-between">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="newpass"
                                        id="newpass"
                                        placeholder="Enter your new password"
                                        className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs focus:outline-none"
                                        {...register("newpass", { required: "Password is required", minLength:{
                                            value: 6,
                                            message: "Password must be a minimal 6 characters",
                                            },
                                        })}
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                                        {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                    </button>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label htmlFor="confirmnewpass" className="text-sm text-gray-500">Confirm Password</label>
                                <div className="w-full relative flex justify-between">
                                    <input
                                        type={showConfPassword ? "text" : "password"}
                                        name="confirmnewpass"
                                        id="confirmnewpass"
                                        placeholder="Confirm your password"
                                        className="w-90 border border-gray-300 p-2.5 rounded-lg text-xs focus:outline-none"
                                        {...register("confirmnewpass", { required: "Password is required", minLength:{
                                            value: 6,
                                            message: "Password must be a minimal 6 characters",
                                        },
                                    })}
                                    />
                                    <button type="button" onClick={() => setShowConfPassword(!showConfPassword)} className="absolute right-4 top-2.5 text-gray-400 cursor-pointer focus:outline-none">
                                        {showConfPassword ? <IoIosEyeOff /> : <IoIosEye />}
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full p-2.5 bg-orange-600 text-xs font-medium text-white rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                            >
                                {isPending ? "Resetting..." : "Reset Password"}
                            </button>
                        </form>
                    ) : (
                        <>
                            <form onSubmit={onSubmit} className="grid gap-4">
                                <div className="flex flex-col gap-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-500">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="nicohondo01@gmail.com"
                                        className="w-90 border text-gray-800 border-gray-300 p-2.5 rounded-lg text-xs focus:outline-none"
                                        required
                                    />
                                </div>

                                {isRejected && (
                                    <p className="text-xs text-red-500">{error}</p>
                                )}

                                <button
                                    type="submit"
                                    disabled={isPending}
                                    className="w-full p-2.5 bg-orange-600 text-xs font-medium text-white rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {isPending ? "Checking..." : "Continue"}
                                </button>
                            </form>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}

export default ForgotPass;