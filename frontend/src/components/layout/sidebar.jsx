import {
    LayoutDashboard,
    PlusCircle,
    Link2,
    BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Create Link",
        path: "/create",
        icon: PlusCircle,
    },
    {
        name: "My Links",
        path: "/my-links",
        icon: Link2,
    },
    {
        name: "Analytics",
        path: "/dashboard-analytics",
        icon: BarChart3,
    },
];

function Sidebar({ isOpen, closeSidebar }) {

    return (

        <aside
            className={`
                fixed md:static
                top-0 left-0
                h-screen
                w-72
                bg-slate-900/90
                backdrop-blur-2xl
                border-r border-white/10
                z-50
                transform transition-transform duration-300
                ${isOpen ? "translate-x-0" : "-translate-x-full"}
                md:translate-x-0
            `}
        >

            {/* Logo */}

            

            {/* Navigation */}

            <nav className="flex flex-col gap-2 px-4 py-6">

                {menuItems.map((item) => {

                    const Icon = item.icon;

                    return (

                        <NavLink
                            key={item.path}
                            to={item.path}
                            onClick={closeSidebar}
                            className={({ isActive }) =>
                                `
                                flex items-center gap-4
                                rounded-2xl
                                px-4 py-3
                                font-medium
                                transition-all duration-300
                                ${
                                    isActive
                                        ? "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg"
                                        : "text-slate-300 hover:bg-white/10 hover:text-white"
                                }
                                `
                            }
                        >

                            <Icon size={20} />

                            {item.name}

                        </NavLink>

                    );

                })}

            </nav>

            {/* Bottom */}

            <div className="absolute bottom-6 left-4 right-4">

                <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4">

                    <p className="text-sm text-slate-300 font-medium">

                        Trimm

                    </p>

                    <p className="mt-1 text-xs text-slate-400 leading-5">

                        Shorten, manage and track your links from one modern dashboard.

                    </p>

                </div>

            </div>

        </aside>

    );

}

export default Sidebar;