import { TrendingUp } from "lucide-react";

function AnalyticsCard({
    title,
    value,
    icon: Icon = TrendingUp,
    color = "from-violet-600 via-indigo-600 to-cyan-500",
}) {

    return (

        <div
            className="
                relative
                overflow-hidden
                rounded-3xl
                border border-white/10
                bg-white/10
                backdrop-blur-xl
                p-5
                sm:p-6
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-2xl
                hover:shadow-cyan-500/10
            "
        >

            {/* Background Glow */}

            <div
                className={`
                    absolute
                    -right-10
                    -top-10
                    h-32
                    w-32
                    rounded-full
                    bg-gradient-to-br
                    ${color}
                    opacity-20
                    blur-3xl
                `}
            />

            {/* Content */}

            <div className="relative z-10 flex items-start justify-between">

                <div>

                    <p className="text-sm font-medium uppercase tracking-wider text-slate-400">

                        {title}

                    </p>

                    <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-white break-words">

                        {value}

                    </h2>

                </div>

                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        bg-gradient-to-r
                        ${color}
                        text-white
                        shadow-lg
                    `}
                >

                    <Icon size={26} />

                </div>

            </div>

            {/* Bottom Label */}

            <div className="relative z-10 mt-6 flex items-center gap-2 text-sm text-emerald-400">

                <TrendingUp size={16} />

                <span>Live Analytics</span>

            </div>

        </div>

    );

}

export default AnalyticsCard;