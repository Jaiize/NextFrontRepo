"use client"
import useTheme from "next-theme"
import { CiDark, CiLight } from "react-icons/ci"

const ThemeToggle = () => {
    const {theme, toggle} = useTheme()

  return (
    <button title={`${theme === 'dark' ? 'Go Bright' : 'Go Dark'}`} onClick={toggle} className="border-2 border-transparent focus-visible:outline-0 focus-visible:border-2 focus-visible:border-blue-500 focus-visible:rounded-xl" >
        <div className="flex flex-row items-center justify-between w-19 border p-1 border-gray-500 cursor-pointer rounded-xl group">
            {theme === 'dark' ? <CiLight className="text-xl transition-transform duration-500 group-hover:rotate-180"/> : <CiDark className="text-xl transition-transform duration-600 group-hover:rotate-360"/>}
            <div className={`flex flex-row w-10 h-5.5 rounded-full ${theme === 'dark' ? 'items-center bg-zinc-400' : 'items-center bg-zinc-600'} px-1`}>
                <div className={`h-4 w-4 rounded-xl transition-transform duration-300 ${theme === 'dark' ? 'bg-zinc-900 translate-x-0' : 'bg-zinc-300 translate-x-4'}`}/>
            </div>
        </div>
   
    </button>
  )
}
export default ThemeToggle