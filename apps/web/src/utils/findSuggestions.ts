import {AppRouteProps} from "../constants/routes";

type Suggestions = Array<[string, AppRouteProps]>;

export function findSuggestions(appRoutes: AppRouteProps, searchText: string, parentPathname: string = ''): Suggestions {
    return Object.entries(appRoutes.children || {}).reduce((routeEntries, routeEntry) => {
        const [pathname, appRoute] = routeEntry as [string, AppRouteProps];
        const childrenSuggestions = findSuggestions(appRoute, searchText, pathname);
        const searchRegExp = new RegExp(searchText, 'gi');
        const hasSuggestion = appRoute.title?.match(searchRegExp);
        const suggestions = [
            ...routeEntries,
            ...childrenSuggestions,
        ];

        if (hasSuggestion) {
            const suggestionPathname = parentPathname + pathname;
            suggestions.push([suggestionPathname, appRoute]);
        }

        return suggestions;
    }, [] as Suggestions);
}
