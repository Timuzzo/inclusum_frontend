import { createContext, useState } from "react";
import { createTheme } from "@mui/material";
import { amber, deepOrange, grey } from '@mui/material/colors';

export const ThemeContext = createContext();

export default function ThemeContextProvider (props) {
    const [themeToggle, setThemeToggle] = useState(false)

    // const getDesignTokens = (mode) => ({
    //     palette: {
    //       mode,
    //       primary: {
    //         ...amber,
    //         ...(mode === 'dark' && {
    //           main: amber[300],
    //         }),
    //       },
    //       ...(mode === 'dark' && {
    //         background: {
    //           default: deepOrange[900],
    //           paper: deepOrange[900],
    //         },
    //       }),
    //       text: {
    //         ...(mode === 'light'
    //           ? {
    //               primary: grey[900],
    //               secondary: grey[800],
    //             }
    //           : {
    //               primary: '#fff',
    //               secondary: grey[500],
    //             }),
    //       },
    //     },
    //   });
      
      
    //   const darkModeTheme = createTheme(getDesignTokens('dark'));
      

    const theme = createTheme({ 
        palette: {
            primary: {
                main: '#3476AD'
            },
            secondary: {
                main: '#0f6B63'
            },
            mode: 'dark'
        },
        typography: {
            fontFamily: [
                'IBM Plex Sans',
                'Poppins'
            ].join(' ,'),
        }}
    );
    return (
        <ThemeContext.Provider value={{theme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}