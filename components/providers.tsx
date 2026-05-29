"use client"
import { ThemeProvider } from 'next-theme'
import React from 'react'

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system">{children}</ThemeProvider>
  )
}

export default Providers