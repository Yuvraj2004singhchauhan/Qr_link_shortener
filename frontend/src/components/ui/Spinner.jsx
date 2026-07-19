function Spinner({
    size = "md",
    fullScreen = false,
    text = "",
}) {

    const sizes = {
        sm: "w-5 h-5 border-2",
        md: "w-10 h-10 border-[3px]",
        lg: "w-16 h-16 border-4",
    };

    const spinner = (
        <div className="flex flex-col items-center gap-4">

            <div
                className={`
                    ${sizes[size]}
                    rounded-full
                    border-violet-500
                    border-t-cyan-400
                    animate-spin
                `}
            />

            {text && (
                <p className="text-slate-300 text-sm">

                    {text}

                </p>
            )}

        </div>
    );

    if (fullScreen) {

        return (
            <div className="min-h-[70vh] flex items-center justify-center">

                {spinner}

            </div>
        );

    }

    return (

        <div className="flex justify-center items-center py-12">

            {spinner}

        </div>

    );

}

export default Spinner;