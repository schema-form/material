import List from "@mui/material/List";
import {AppRouteProps, appRoutes} from "../constants/routes";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Collapse, Divider, InputBaseProps, MenuItem} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import {useMemo, useState} from "react";
import {useDrawerState} from "../components/Layout/DrawerProvider";
import Typography from "@mui/material/Typography";
import Highlighter from "react-highlight-words";
import {AppNavigationSearch} from "./AppNavigationSearch";
import {findSuggestions} from "../utils/findSuggestions";

type NavigationItemProps = AppRouteProps & {
    pathname: string;
    level?: number;
    highlightText?: string;
}

function NavigationItem(props: NavigationItemProps) {
    const { level = 1 } = props;
    const hasChildren = !isEmpty(props.children);
    const { pathname } = useLocation();
    const selected = pathname === props.pathname;
    const hasPathMatch = pathname.startsWith(props.pathname);
    const [isExpanded, setExpanded] = useState(hasPathMatch);
    const toggleExpand = () => setExpanded(!isExpanded);
    const { closeDrawer } = useDrawerState();
    const paddingLeft = level * 2;

    const renderChild = ([itemPath, itemProps]: [string, AppRouteProps]) => {
        const parentPath = props.pathname;
        const path = parentPath + itemPath;
        const itemLevel = level + 1;

        return (
            <NavigationItem
                key={path}
                pathname={path}
                level={itemLevel}
                highlightText={props?.highlightText}
                {...itemProps}
            />
        );
    }

    const primaryText = (
        <Typography
            component={Highlighter}
            textToHighlight={props?.title}
            searchWords={[props?.highlightText]}
            variant="body1"
            color={(selected || hasChildren) ? 'textPrimary' : 'textSecondary'}
        />
    );

    if (hasChildren) {
        return (
            <React.Fragment>
                <MenuItem
                    onClick={toggleExpand}
                    sx={{pl: paddingLeft}}
                >
                    <ListItemText primary={primaryText} />
                    <ListItemIcon style={{minWidth: 'auto'}}>
                        <KeyboardArrowRightIcon
                            fontSize="small"
                            sx={{transform: isExpanded ? 'rotate(90deg)' : undefined}}
                        />
                    </ListItemIcon>
                </MenuItem>
                <Collapse in={isExpanded}>
                    {Object.entries(props.children || {}).map(renderChild)}
                </Collapse>
            </React.Fragment>
        )
    }

    return (
        <MenuItem
            component={Link}
            to={props.pathname}
            selected={selected}
            sx={{pl: paddingLeft}}
            onClick={closeDrawer}
        >
            <ListItemText primary={primaryText} />
        </MenuItem>
    )
}

export function AppNavigation() {
    const [searchText, setSearchText] = useState('');
    const handleSearchChange: InputBaseProps['onChange'] = (event) => setSearchText(event?.target.value);
    const isSearching = Boolean(searchText);
    const suggestions = useMemo(() => isSearching ? findSuggestions({ children: appRoutes }, searchText) : [], [searchText]);
    const appRouteEntries = isSearching
        ? suggestions
        : Object.entries(appRoutes);

    const renderItem = ([itemPath, itemProps]: [string, AppRouteProps]) => (
        <NavigationItem
            key={itemPath}
            data-path={itemPath}
            pathname={itemPath}
            highlightText={searchText}
            {...itemProps}
        />
    )

    const itemsList = (
        <List>
            {appRouteEntries.map(renderItem)}
        </List>
    );

    return (
        <Box>
            <AppNavigationSearch
                value={searchText}
                onChange={handleSearchChange}
            />
            <Divider />
            {itemsList}
        </Box>
    )
}

export default AppNavigation;
