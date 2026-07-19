import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, ArrowRight, QrCode } from "lucide-react";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

function Login() {

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const data = await loginUser(formData);

            login(data);

            navigate("/dashboard");

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <div className="min-h-screen flex bg-slate-950 overflow-hidden">

            {/* Background Blobs */}

            <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-violet-600/30 blur-[120px] animate-pulse" />

            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />

            {/* Left */}

            <div className="hidden lg:flex w-1/2 relative items-center justify-center px-16">

                <div className="relative z-10 max-w-lg">

                    <div className="flex items-center gap-4 mb-8">

                    <div className="bg-white/10 backdrop-blur-xl p-3 rounded-2xl">

                        <img
                            src="/logo.png"
                            alt="Trimm Logo"
                            className="w-12 h-12 object-contain"
                        />

                    </div>

                    <h1 className="text-6xl font-black text-white tracking-tight">

                        Trimm

                    </h1>

                    </div>

                    <h2 className="text-4xl font-bold leading-tight text-white">

                        Shorten links.
                        <br />
                        Track clicks.
                        <br />
                        Grow faster.

                    </h2>

                    <p className="text-slate-300 text-lg mt-8 leading-8">

                        Create branded short links, generate QR codes,
                        and monitor real-time analytics from one beautiful dashboard.

                    </p>

                    <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

                        <div className="space-y-5">

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                QR Code Generation

                            </div>

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                Real-Time Analytics

                            </div>

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                Fast & Secure Links

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right */}

            <div className="flex-1 flex justify-center items-center px-6">

                <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 md:p-10 border border-white">

                    <h2 className="text-4xl font-bold text-center text-slate-800">

                        Welcome Back

                    </h2>

                    <p className="text-center text-slate-500 mt-3">

                        Login to continue using Trimm

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6 mt-10"
                    >

                        <input
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white py-4 font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
                        >

                            Continue

                            <ArrowRight size={20} />

                        </button>

                    </form>

                    <p className="text-center text-slate-600 mt-8">

                        Don't have an account?{" "}

                        <Link
                            to="/register"
                            className="font-semibold text-violet-600 hover:text-violet-700 transition"
                        >

                            Create Account

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Login;