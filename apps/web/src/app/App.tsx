import React from "react";
import AppRouter from "./AppRouter";
import CssBaseline from "@mui/material/CssBaseline";
import AppThemeProvider from "./AppThemeProvider";

export function App() {
    return (
        <AppThemeProvider>
            <CssBaseline />
            <AppRouter />
        </AppThemeProvider>
    )
}

export default App;
