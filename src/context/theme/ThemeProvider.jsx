import { useState } from "react";
import ThemeContext from "./themeContext";

export default function ThemeProvider({children}){
    const [theme, setTheme] = useState('light');

    const toogleTheme = (() => {
        setTheme((currentTheme) => {
            if(currentTheme === 'light') return setTheme('dark');
            return setTheme('light');
        })
    })

    console.log(theme);

    return <ThemeContext.Provider 
        value={{theme, toogleTheme}}
    > {children} </ThemeContext.Provider>
}