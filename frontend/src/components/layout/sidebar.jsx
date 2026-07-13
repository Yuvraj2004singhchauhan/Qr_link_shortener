import { NavLink } from "react-router-dom";

function Sidebar() {

    return (

        <aside className="w-64 bg-white border-r">

            <nav className="flex flex-col p-4 gap-3">

                <NavLink to="/dashboard">
                    Dashboard
                </NavLink>

                <NavLink to="/create">
                    Create Link
                </NavLink>

                <NavLink to="/my-links">
                    My Links
                </NavLink>

                <NavLink to="/analytics">
                    Analytics
                </NavLink>

            </nav>

        </aside>

    );

}

export default Sidebar;