import React, { useEffect } from 'react'
import { X } from 'lucide-react'

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const AppSideBar: React.FC<SidebarProps> = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape" && isOpen) {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEscKey)
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            window.removeEventListener("keydown", handleEscKey)
            document.body.style.overflow = ""
        }
    }, [isOpen, onClose])


    return (
        <>
            <div
                className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-40
                ${isOpen ? "opacity-100 visible" : 'opacity-0 invisible pointer-events-none'}`}
                onClick={onClose}
                aria-hidden="true"
            ></div>

            <div
                className={`fixed inset-y-0 right-0 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-2/5 bg-white shadow-xl 
                transform transition-transform duration-300 z-50
                ${isOpen ? "translate-x-0" : "translate-x-full"}`}
                aria-label="Job details sidebar"
            >
                <div className="sticky top-0 flex justify-between items-center p-4 border-b bg-white z-10">
                    <h2 className="text-lg font-semibold">Job Details</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-full hover:bg-gray-200 transition-colors"
                        aria-label="Close sidebar"
                    >
                        <X size={20} />
                    </button>
                </div>
                
                <div className="overflow-y-auto h-[calc(100vh-64px)] p-4">{children}</div>

            </div>
        </>
    )
}

export default AppSideBar