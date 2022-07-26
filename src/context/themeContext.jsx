import { createContext, useState } from "react";

const ThemeContext = createContext(null);

export const ThemeProvider = ({children}) => {
    const [theme, setTheme] = useState()
    const [colors,  setColors] = useState()
    const [currentPage,  setCurrentPage] = useState()

    const value = {
        theme,
        setTheme,
        colors,
        setColors,
        currentPage,
        setCurrentPage
    }

    return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeContext