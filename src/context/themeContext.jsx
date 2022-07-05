import { createContext, useReducer } from "react";

export const ThemeContext = createContext(null);

const initialState = {
    currentTheme: 'light'
}

const themeReducer = (state, action) => {
    switch (action.type) {
        case "DARKMODE": return { currentTheme: 'dark' }
        case "LIGHTMODE": return { currentTheme: 'light' }
        default: return state;
    }
}

export const ThemeProvider = (props) => {
    const [state, dispatch] = useReducer(themeReducer, initialState);

    return <ThemeContext.Provider value={{state, dispatch}}>{props.children}</ThemeContext.Provider>
}