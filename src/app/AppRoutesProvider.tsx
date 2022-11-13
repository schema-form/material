import React, {PropsWithChildren, useContext} from "react";
import {AppRouteProps, appRoutes, AppRoutes} from "../constants/routes";
import {useLocation} from "react-router-dom";

const AppRoutesContext = React.createContext<AppRoutes>(appRoutes);

export type AppRouteProviderProps = PropsWithChildren<{}>;

export function AppRouteProvider({ children }: AppRouteProviderProps) {
    return (
        <AppRoutesContext.Provider value={appRoutes}>
            {children}
        </AppRoutesContext.Provider>
    )
}

export default AppRouteProvider;

export const useAppRoutes = () => useContext(AppRoutesContext);

type AppRoutePropsWithPathname = AppRouteProps & {
    pathname: string;
}

export const useAppRoute = (): AppRoutePropsWithPathname => {
    const appRoutes = useAppRoutes();
    const { pathname } = useLocation();
    const pathSegments = pathname.split('/').slice(1);
    const appRouteProps = pathSegments.reduce((routes, pathSegment) => {
        const path = `/${pathSegment}`;
        return routes[path]?.children || routes[path];
    }, appRoutes as any) as AppRouteProps;

    return {
        ...appRouteProps,
        pathname,
    }
}
