import React, { createContext, useState, useContext } from 'react'

/** 
 *  @deprecated used react-hot-toast instead
 * 
 */ 
type Snackbar = { message: string, option?: string, type?: 'success' | 'error' | 'info' }
type SnackbarContextType = { show: (s: Snackbar) => void }
const SnackbarContext = createContext<SnackbarContextType | null>(null)

const SnackbarProvider = ({ children }: { children: React.ReactNode }) => {
    const [snack, setSnack] = useState<Snackbar | null>(null)
    const show = (s: Snackbar) => {
        setSnack(s);
        setTimeout(() => setSnack(null), 3000);
    }
  return (
    <SnackbarContext.Provider value={{ show }}>
        { children }
        {snack &&
        <div className='fixed h-10 rounded-xl bottom-5 left-1/2 -translate-x-1/2 bg-black text-white text-sm animate-in slide-in-from-bottom-5 w-fit flex flex-row justify-between items-center'>
            <span className=''>{snack.message}</span>
            <span onClick={() => setSnack(null)}>{snack.option || 'Okay'}</span>
        </div>        
        }
    </SnackbarContext.Provider>
  )
}
export default SnackbarProvider

export const useSnackbar = (s: Snackbar) => {
    const ctx = useContext(SnackbarContext)
    if (!ctx) throw new Error("useSnackbar must be use inside SnackbarProvider wrapper!")
    const { show } = ctx
    show(s)
}