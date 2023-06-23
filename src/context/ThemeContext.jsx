import { createContext, useState, useEffect } from "react";
import { createTheme } from "@mui/material";

export const ThemeContext = createContext();

export default function ThemeContextProvider (props) {
    const [themeToggle, setThemeToggle] = useState(false)

    const theme = createTheme({ 
        palette: {
            primary: {
                main: '#3476AD' //blue
            },
            secondary: {
                main: '#0f6B63' //green
            },
            mode: themeToggle? 'dark' : 'light'
        },
        typography: {
            fontFamily: [
                'IBM Plex Sans', //main
                'Poppins' //secondary
            ].join(' ,'),
        }}
    );

useEffect(() => {
    const darkmode = localStorage.getItem("darkmode");
    if (darkmode) {
    setThemeToggle(darkmode);
    }
}, []);

useEffect(() => {
    if (themeToggle) {
    localStorage.setItem("darkmode", themeToggle);
    }
}, [themeToggle]);

    return (
        <ThemeContext.Provider value={{theme, themeToggle, setThemeToggle}}>
            {props.children}
        </ThemeContext.Provider>
    )
}