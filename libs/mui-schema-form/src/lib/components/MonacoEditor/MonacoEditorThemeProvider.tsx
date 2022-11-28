import React, {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {useTheme} from "@mui/material/styles";
import {EditorProps} from "@monaco-editor/react";

type MonacoEditorTheme = NonNullable<EditorProps['theme']>;

const MonacoEditorThemeContext = createContext<{
    theme?: MonacoEditorTheme;
    setTheme: (theme: MonacoEditorTheme) => void;
}>({
    theme: undefined,
    setTheme: () => null
})

export const useMonacoEditorTheme = () => useContext(MonacoEditorThemeContext);

const MONACO_EDITOR_THEME = 'MONACO_EDITOR_THEME';

export const monacoEditorStorage = {
    setTheme: (theme: MonacoEditorTheme) => {
        return window.localStorage.setItem(MONACO_EDITOR_THEME, theme)
    },
    getTheme: () => window.localStorage.getItem(MONACO_EDITOR_THEME)
}

export function MonacoEditorThemeProvider({ children }: PropsWithChildren<any>) {
    const { palette } = useTheme();
    const defaultTheme = palette.mode === 'dark'
        ? 'vs-dark'
        : 'light';
    const [theme, _setTheme] = useState<MonacoEditorTheme>(defaultTheme);

    const setTheme = (theme: MonacoEditorTheme) => {
        if (!theme) return;
        _setTheme(theme);
        monacoEditorStorage.setTheme(theme);
    }

    useEffect(() => {
        const theme = monacoEditorStorage.getTheme();
        if (theme) setTheme(theme);
    }, [])

    return (
        <MonacoEditorThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </MonacoEditorThemeContext.Provider>
    )
}

export default MonacoEditorThemeProvider;
