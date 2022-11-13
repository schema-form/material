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

export type ActiveAppRouteProps = AppRouteProps & {
    pathname: string;
}

export const useAppRoute = (pathname?: string): ActiveAppRouteProps | undefined => {
    const location = useLocation();
    const appRoutePathname = pathname || location?.pathname;
    const appRoutes = useAppRoutes();
    const pathSegments = appRoutePathname?.split('/').slice(1);
    const rootRoute: AppRouteProps = {
        title: 'Root',
        children: appRoutes
    }
    const appRouteProps = pathSegments.reduce((routeProps?: AppRouteProps, pathSegment = '') => {
        const path = `/${pathSegment}`;
        return routeProps?.children?.[path];
    }, rootRoute);

    if (!appRouteProps) return;

    return {
        ...appRouteProps,
        pathname: appRoutePathname,
    }
}


