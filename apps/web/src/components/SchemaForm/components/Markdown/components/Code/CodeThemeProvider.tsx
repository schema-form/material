import React, {PropsWithChildren, useContext, useState} from 'react';

type CodeTheme = 'dark' | 'light';

type CodeThemeContextValue = {
    theme: CodeTheme;
    setTheme: (theme: CodeTheme) => void;
    toggleTheme: () => void;
}

const CodeThemeContext = React.createContext<CodeThemeContextValue>({
    theme: 'light',
    setTheme: () => null,
    toggleTheme: () => null
});

const { Provider } = CodeThemeContext;

export const useCodeTheme = () => useContext(CodeThemeContext);

export type CodeThemeProviderProps = PropsWithChildren<{}>;

export function CodeThemeProvider({ children }: CodeThemeProviderProps) {
    const storageKey = 'code-theme';
    const codeTheme = global?.localStorage?.getItem(storageKey) as CodeTheme
        || 'light';
    const [theme, _setTheme] = useState<CodeTheme>(codeTheme);
    const storeTheme = (theme: CodeTheme) => {
        if (theme) global?.localStorage?.setItem(storageKey, theme);
    };

    const setTheme = (theme: CodeTheme) => {
        _setTheme(theme);
        storeTheme(theme);
    }

    const toggleTheme = () => {
        const newTheme = theme === 'light'
            ? 'dark'
            : 'light';
        setTheme(newTheme);
    }

    return (
        <Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </Provider>
    )
}

export default CodeThemeProvider;
