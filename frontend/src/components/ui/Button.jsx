function Button({
    children,
    variant = "primary",
    loading = false,
    className = "",
    ...props
}) {

    const baseStyles =
        "inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";

    const variants = {
        primary:
            "bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-lg hover:shadow-cyan-500/20 hover:-translate-y-0.5",

        secondary:
            "bg-white/10 backdrop-blur-xl border border-white/10 text-white hover:bg-white/20",

        danger:
            "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:shadow-lg hover:shadow-red-500/20",

        success:
            "bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:shadow-lg hover:shadow-green-500/20",

        outline:
            "border border-violet-500 text-violet-600 hover:bg-violet-50",

        ghost:
            "text-slate-300 hover:bg-white/10 hover:text-white"
    };

    return (
        <button
            {...props}
            disabled={loading || props.disabled}
            className={`${baseStyles} ${variants[variant]} px-5 py-3 ${className}`}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;