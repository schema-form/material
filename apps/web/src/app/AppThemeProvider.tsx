import React, {PropsWithChildren} from 'react';
import {createTheme, CssBaseline, ThemeProvider} from '@mui/material';

export const theme = createTheme({
    palette: {
        mode: 'light'
    },
});

export type AppThemeProviderProps = PropsWithChildren<{}>;

export default function AppThemeProvider({ children }: AppThemeProviderProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
