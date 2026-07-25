import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Sparkles, ArrowRight, QrCode } from "lucide-react";

import { registerUser } from "../../services/authService";
import { toast } from "react-toastify";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
    });

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await registerUser(formData);

            navigate("/");

        }

        catch (error) {
            console.log(error.response?.data);

            const data = error.response?.data;

            let message = "Registration failed.";

            if (data) {
                if (data.detail) {
                    message = data.detail;
                } else if (data.error) {
                    message = data.error;
                } else if (data.message) {
                    message = data.message;
                } else {
                    const firstKey = Object.keys(data)[0];

                    if (firstKey) {
                        message = Array.isArray(data[firstKey])
                            ? data[firstKey][0]
                            : data[firstKey];
                    }
                }
            }

            toast.error(message);
        }

    };

    return (

        <div className="min-h-screen flex bg-slate-950 overflow-hidden">

            {/* Background Blobs */}

            <div className="absolute top-16 left-16 w-72 h-72 rounded-full bg-violet-600/30 blur-[120px] animate-pulse" />

            <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-cyan-500/20 blur-[120px] animate-pulse" />

            {/* Left Side */}

            <div className="hidden lg:flex w-1/2 items-center justify-center px-16 relative">

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

                    <h2 className="text-4xl font-bold text-white leading-tight">

                        Join Trimm.
                        <br />
                        Shorten smarter.
                        <br />
                        Share faster.

                    </h2>

                    <p className="text-slate-300 mt-8 text-lg leading-8">

                        Create your free account and start managing
                        branded short links with analytics and QR codes.

                    </p>

                    <div className="mt-12 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/10 p-8">

                        <div className="space-y-5">

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                Unlimited Link Management

                            </div>

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                QR Code Generation

                            </div>

                            <div className="flex items-center gap-4 text-white">

                                <Sparkles className="text-cyan-300" />

                                Real-Time Analytics

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            {/* Right Side */}

            <div className="flex-1 flex justify-center items-center px-6 py-10">

                <div className="w-full max-w-lg bg-white/80 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white p-8 md:p-10">

                    <h2 className="text-4xl font-bold text-center text-slate-800">

                        Create Account

                    </h2>

                    <p className="text-center text-slate-500 mt-3">

                        Start your journey with Trimm

                    </p>

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 mt-8"
                    >

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <input
                            type="email"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                            <input
                                type="text"
                                placeholder="First Name"
                                name="first_name"
                                value={formData.first_name}
                                onChange={handleChange}
                                className="rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                            />

                            <input
                                type="text"
                                placeholder="Last Name"
                                name="last_name"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                            />

                        </div>

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password2"
                            value={formData.password2}
                            onChange={handleChange}
                            className="w-full rounded-xl border border-slate-300 p-4 focus:ring-4 focus:ring-violet-200 focus:border-violet-500 outline-none transition-all"
                        />

                        <button
                            type="submit"
                            className="w-full flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white py-4 font-semibold shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-300"
                        >

                            Create Account

                            <ArrowRight size={20} />

                        </button>

                    </form>

                    <p className="text-center text-slate-600 mt-8">

                        Already have an account?{" "}

                        <Link
                            to="/"
                            className="font-semibold text-violet-600 hover:text-violet-700 transition"
                        >

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;