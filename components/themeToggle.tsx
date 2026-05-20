"use client"
import { useEffect, useState } from "react"
import { CiDark, CiLight } from "react-icons/ci"

const ThemeToggle = () => {
    const [theme, setTheme] = useState<'dark' | 'light'>('light')
    
    useEffect(() => {
        const isDark = document.documentElement.classList.contains('dark');
        setTheme(isDark ? 'dark' : 'light');
    }, [])

    const handleToggle = () => {
        const newTheme = theme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
        document.documentElement.classList.remove('dark', 'light');
        document.documentElement.classList.add(newTheme);
        localStorage.setItem('theme', newTheme);
    }

  return (
    <button title="themeToggle" onClick={handleToggle}>{theme === 'dark' ? 
        <div className="flex flex-row items-center justify-between w-19 border p-1 border-gray-500 cursor-pointer rounded-xl">
            <CiLight className="text-xl"/>
            <span className="font-grotesk text-md mr-1">Light</span>
        </div>
        : 
        <div className="text-gray-950 text-md flex flex-row cursor-pointer items-center justify-between w-19 border p-1 border-gray-500 rounded-xl">
            <CiDark className="text-xl"/>
            <span className="font-grotesk text-md mr-1">Dark</span>
        </div>
    }</button>
  )
}

export default ThemeToggle