import { X } from "lucide-react";

function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4">

                {/* Header */}
                <div className="flex justify-between items-center border-b px-6 py-4">
                    <h2 className="text-xl font-bold">
                        {title}
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Body */}
                <div className="px-6 py-6">
                    {children}
                </div>

            </div>
        </div>
    );
}

export default Modal;