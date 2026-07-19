function Card({
    children,
    variant = "glass",
    hover = false,
    className = "",
}) {

    const baseStyles =
        "rounded-3xl transition-all duration-300";

    const variants = {

        glass:
            "bg-white/10 backdrop-blur-xl border border-white/10 shadow-xl",

        solid:
            "bg-white border border-slate-200 shadow-md",

        dark:
            "bg-slate-900 border border-slate-800 shadow-lg",

        gradient:
            "bg-gradient-to-br from-violet-600/20 via-indigo-600/10 to-cyan-500/20 backdrop-blur-xl border border-white/10 shadow-xl",

    };

    return (

        <div
            className={`
                ${baseStyles}
                ${variants[variant]}
                ${hover ? "hover:-translate-y-1 hover:shadow-2xl hover:shadow-cyan-500/10" : ""}
                p-6
                ${className}
            `}
        >

            {children}

        </div>

    );

}

export default Card;