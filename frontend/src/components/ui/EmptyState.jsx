import { Inbox } from "lucide-react";

function EmptyState({
    title = "Nothing here yet",
    message = "No data available.",
    icon,
    action,
    className = "",
}) {

    const Icon = icon || Inbox;

    return (
        <div
            className={`
                flex flex-col items-center justify-center
                rounded-3xl
                border border-white/10
                bg-white/10
                backdrop-blur-xl
                py-14 px-6
                text-center
                transition-all duration-300
                ${className}
            `}
        >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-violet-600/20 to-cyan-500/20 border border-white/10">

                <Icon className="w-10 h-10 text-cyan-300" />

            </div>

            <h3 className="mt-6 text-2xl font-semibold text-white">

                {title}

            </h3>

            <p className="mt-2 max-w-md text-slate-300">

                {message}

            </p>

            {action && (
                <div className="mt-8">

                    {action}

                </div>
            )}
        </div>
    );
}

export default EmptyState;