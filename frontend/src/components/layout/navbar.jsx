function Navbar() {
    return (
        <nav className="h-16 bg-white border-b flex items-center justify-between px-6 ">

            <h1 className="text-2xl font-bold text-blue-600">
                QR Link Shortener
            </h1>

            <div className="flex items-center gap-4">

                <span className="font-medium">
                    Welcome, Yuvraj
                </span>

                <img
                    src="https://ui-avatars.com/api/?name=Y"
                    alt=""
                    className="w-10 h-10 rounded-full"
                />

            </div>

        </nav>
    );
}

export default Navbar;