import { X } from "lucide-react";

function Modal({
    isOpen,
    onClose,
    title,
    children,
    maxWidth = "max-w-md",
}) {

    if (!isOpen) return null;

    return (

        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-300"
            onClick={onClose}
        >

            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    w-full
                    ${maxWidth}
                    rounded-3xl
                    border border-white/10
                    bg-slate-900/90
                    backdrop-blur-2xl
                    shadow-2xl
                    overflow-hidden
                    animate-in zoom-in-95 duration-300
                `}
            >

                {/* Header */}

                <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                    <h2 className="text-2xl font-bold text-white">

                        {title}

                    </h2>

                    <button
                        onClick={onClose}
                        className="rounded-xl p-2 text-slate-400 transition-all duration-300 hover:bg-white/10 hover:text-white"
                    >

                        <X size={22} />

                    </button>

                </div>

                {/* Body */}

                <div className="p-6 text-slate-300">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Modal;