import { useState } from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/navbar";
import Sidebar from "../components/layout/sidebar";

function DashboardLayout() {

    const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {

        setSidebarOpen((prev) => !prev);

    };

    const closeSidebar = () => {

        setSidebarOpen(false);

    };

    return (

        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-x-hidden">

            {/* Decorative Background */}

            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">

                <div className="absolute -top-40 -left-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

                <div className="absolute top-1/3 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

                <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-indigo-600/20 blur-[120px]" />

            </div>

            {/* Navbar */}

            <Navbar toggleSidebar={toggleSidebar} />

            <div className="flex min-h-[calc(100vh-72px)]">

                {/* Sidebar */}

                <Sidebar
                    isOpen={sidebarOpen}
                    closeSidebar={closeSidebar}
                />

                {/* Mobile Overlay */}

                {sidebarOpen && (

                    <div
                        onClick={closeSidebar}
                        className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm md:hidden"
                    />

                )}

                {/* Main Content */}

                <main
                    className="
                        flex-1
                        overflow-x-hidden
                        p-5
                        sm:p-6
                        lg:p-8
                        xl:p-10
                    "
                >

                    <div className="mx-auto max-w-7xl">

                        <Outlet />

                    </div>

                </main>

            </div>

        </div>

    );

}

export default DashboardLayout;