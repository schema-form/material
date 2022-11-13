import {HashRouter, Route, Routes} from "react-router-dom";
import AppLayout from "./AppLayout";

export function AppRouter() {
    return (
        <HashRouter>
            <Routes>
                <Route path="*" element={<AppLayout />} />
            </Routes>
        </HashRouter>
    )
}
