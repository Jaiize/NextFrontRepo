"use client"
import toast from "react-hot-toast"
import { MdDone } from "react-icons/md"
import { BiSolidError } from "react-icons/bi"
import { BsInfoLg } from "react-icons/bs"
import { MdDownloadDone } from "react-icons/md"

/**
 * Couldn't use the name useAppToaster cause it won't let me use it inside download function: Try to resolve this ASAP
 * 
 */
export const appToaster = () => {
    const show = (message: string, type: 'success' | 'error' | 'downloaded' | 'info' = 'info', id?: string): string => {
        return toast.custom((t) => (
            <div className={`flex flex-row justify-between items-center text-white rounded-xl shadow-md shadow-zinc-800 py-3 px-4 transition-all duration-300 min-w-75 max-w-125 ${type === "success" ? 'bg-green-600' : type === 'error' ? 'bg-red-800' : type === 'info' ? 'bg-zinc-600' : 'bg-green-700' } ${t.visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'}`}>
                <div className={`flex flex-row items-center gap-2`}>
                    {type === 'success' ? (<MdDone size={24}/>) : type === 'error' ? (<BiSolidError size={24}/>) : 
                        type === 'downloaded' ? (<MdDownloadDone size={24}/>) : (<BsInfoLg size={24}/>)}
                    <span className={`flex-1 font-rob`}>{message}</span>
                </div>
                <div onClick={() => toast.dismiss(t.id)} className="hover:cursor-pointer text-sm font-mont">Close</div>
            </div>
        ), { duration: type === 'downloaded' ? 5000 : 3000, id: id! })
    }
    return { show, success: (m: string, id?: string) => show(m, 'success', id), error: (m: string) => show(m, 'error')} 
}
