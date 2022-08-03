import { createContext, useState } from "react";

const CPContext = createContext(null);

export const CPProvider = ({children}:any) => {
    const [currentPage, setCurrentPage] = useState<any>()

    const value:any = {
        currentPage, 
        setCurrentPage
    }

    return <CPContext.Provider value={value}>{children}</CPContext.Provider>
}

export default CPContext