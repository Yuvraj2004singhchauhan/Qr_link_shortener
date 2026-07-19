import { Menu, Bell, ChevronDown, LogOut } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ toggleSidebar }) {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const [open, setOpen] = useState(false);

    const initials =
        `${user?.first_name?.[0] || ""}${user?.last_name?.[0] || ""}` ||
        user?.username?.[0]?.toUpperCase() ||
        "U";

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <nav className="sticky top-0 z-40 h-16 bg-slate-900/80 backdrop-blur-xl border-b border-white/10">
            <div className="h-full px-4 md:px-8 flex items-center justify-between">

                {/* Left */}
                <div className="flex items-center gap-4">

                    <button
                        onClick={toggleSidebar}
                        className="md:hidden p-2 rounded-xl text-slate-300 hover:bg-white/10 hover:text-white transition-all"
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-3">

                        <img
                            src="/logo.png"
                            alt="Trimm"
                            className="w-10 h-10 object-contain"
                        />

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-white">
                                Trimm
                            </h1>

                            <p className="hidden md:block text-xs text-slate-400">
                                Link Management Dashboard
                            </p>
                        </div>

                    </div>

                </div>

                {/* Right */}
                <div className="flex items-center gap-4">

                    {/* Welcome Text */}
                    <div className="hidden sm:flex flex-col items-end">

                        <span className="text-sm text-slate-400">
                            Welcome back,
                        </span>

                        <span className="font-semibold text-white">
                            {user?.first_name || user?.username}
                        </span>

                    </div>

                    {/* Profile Dropdown */}
                    <div className="relative">

                        <button
                            onClick={() => setOpen(!open)}
                            className="flex items-center gap-2"
                        >

                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {initials}
                            </div>

                            <ChevronDown
                                size={18}
                                className={`text-slate-400 transition-transform duration-300 ${
                                    open ? "rotate-180" : ""
                                }`}
                            />

                        </button>

                        {open && (
                            <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-white/10 bg-slate-900 shadow-2xl overflow-hidden">

                                <div className="px-4 py-3 border-b border-white/10">

                                    <p className="text-white font-semibold">
                                        {user?.first_name || user?.username}
                                    </p>

                                    <p className="text-xs text-slate-400">
                                        {user?.email}
                                    </p>

                                </div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 text-red-400 transition"
                                >
                                    <LogOut size={18} />
                                    Logout
                                </button>

                            </div>
                        )}

                    </div>

                </div>

            </div>
        </nav>
    );
}

export default Navbar;