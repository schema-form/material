import AppRouter from "./AppRouter";
import CssBaseline from "@mui/material/CssBaseline";
import * as React from "react";
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
