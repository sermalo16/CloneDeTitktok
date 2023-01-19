import React, { useState, useEffect, createContext} from "react";
import {ThemeProvider as Theme} from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {darkTheme} from "./DarkTheme";
import {lightTheme} from "./LightTheme";


export const themeContext = createContext({
    darkMode: true,
    toggleTheme: () => null,
    theme: {},
});


export function ThemeProvider(props){
    const { children } = props;
    const [darkMode, setDarkMode] = useState(true);

    useEffect(() => {
        (async () => {
            const response = await AsyncStorage.getItem("theme");
            if(response)
                setDarkMode(JSON.parse(response));
        })();
    }, []);


    const toggleTheme = async () => {
        setDarkMode(!darkMode);
        await AsyncStorage.setItem("theme", JSON.stringify(!darkMode));
    };

    const data = {
        darkMode,
        toggleTheme,
        theme: darkMode ? darkTheme: lightTheme,
    };

    return (
        <themeContext.Provider value={data}>
            <Theme theme={darkMode ? darkTheme: lightTheme}>{children}</Theme>
        </themeContext.Provider>
    );
}