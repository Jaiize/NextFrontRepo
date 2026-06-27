"use client"
import useTheme from "next-theme"
import { CiDark, CiLight } from "react-icons/ci"

const ThemeToggle = () => {
    const {theme, toggle} = useTheme()

  return (
    <button title="ThemeToggle" onClick={toggle} >{theme === 'dark' ? 
        (<div className="flex flex-row items-center justify-between w-19 border p-1 border-gray-500 cursor-pointer rounded-xl group">
            <CiLight className="text-xl transition-transform duration-500 group-hover:rotate-180"/>
            <span className="font-grotesk text-md mr-1">Light</span>
        </div>)
        : 
        (<div className="text-gray-950 flex flex-row cursor-pointer items-center justify-between w-19 border p-1 border-gray-500 rounded-xl group">
            <CiDark className="text-xl transition-transform duration-600 group-hover:rotate-360"/>
            <span className="font-grotesk text-md mr-1">Dark</span>
        </div>)
    }</button>
  )
}
export default ThemeToggle