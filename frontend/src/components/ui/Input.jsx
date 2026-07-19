function Input({
    label,
    error,
    helperText,
    className = "",
    ...props
}) {
    return (
        <div className="w-full">

            {label && (
                <label className="block mb-2 text-sm font-medium text-slate-200">
                    {label}
                </label>
            )}

            <input
                {...props}
                className={`
                    w-full
                    rounded-xl
                    border
                    px-4
                    py-3
                    bg-white/10
                    backdrop-blur-xl
                    text-white
                    placeholder:text-slate-400
                    border-white/10
                    outline-none
                    transition-all
                    duration-300
                    focus:border-violet-500
                    focus:ring-4
                    focus:ring-violet-500/20
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    ${error ? "border-red-500 focus:ring-red-500/20" : ""}
                    ${className}
                `}
            />

            {error ? (
                <p className="mt-2 text-sm text-red-400">
                    {error}
                </p>
            ) : helperText ? (
                <p className="mt-2 text-sm text-slate-400">
                    {helperText}
                </p>
            ) : null}

        </div>
    );
}

export default Input;