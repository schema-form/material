import List from "@mui/material/List";
import {AppRouteProps, appRoutes} from "../constants/routes";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItemText from "@mui/material/ListItemText";
import ListItem from "@mui/material/ListItem";
import * as React from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Collapse, TextField} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import {useState} from "react";
import {FolderOpenOutlined, SearchOutlined} from "@mui/icons-material";
import {useDrawerState} from "../components/Layout/DrawerProvider";

type NavigationItemProps = AppRouteProps & {
    path: string;
    level?: number;
}

function NavigationItem(props: NavigationItemProps) {
    const { level = 1 } = props;
    const hasChildren = !isEmpty(props.children);
    const { pathname } = useLocation();
    const isSelected = pathname === props.path;
    const hasPathMatch = pathname.startsWith(props.path);
    const [isExpanded, setExpanded] = useState(hasPathMatch);
    const toggleExpand = () => setExpanded(!isExpanded);
    const { closeDrawer } = useDrawerState();

    const renderChild = ([itemPath, itemProps]: [string, AppRouteProps]) => {
        const parentPath = props.path;
        const path = parentPath + itemPath;
        const itemLevel = level + 1;

        return (
            <NavigationItem
                key={path}
                path={path}
                level={itemLevel}
                {...itemProps}
            />
        );
    }

    if (hasChildren) {
        return (
            <React.Fragment>
                <ListItem disablePadding>
                    <ListItemButton
                        onClick={toggleExpand}
                        sx={{ pl: level * 2}}
                    >
                        <ListItemText primary={props?.title} />
                        <ListItemIcon sx={{minWidth: 'auto'}}>
                            <KeyboardArrowRightIcon
                                fontSize="small"
                                sx={{
                                    transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
                                    transition: '.240ms'
                                }}
                            />
                        </ListItemIcon>
                    </ListItemButton>
                </ListItem>
                <Collapse in={isExpanded}>
                    {Object.entries(props.children || {}).map(renderChild)}
                </Collapse>
            </React.Fragment>
        )
    }

    return (
        <ListItem disablePadding>
            <ListItemButton
                component={Link}
                to={props.path}
                selected={isSelected}
                sx={{ pl: level * 2}}
                onClick={closeDrawer}
            >
                <ListItemText primary={props?.title} />
            </ListItemButton>
        </ListItem>
    )
}

export function AppNavigation() {
    const renderItem = ([itemPath, itemProps]: [string, AppRouteProps]) => (
        <NavigationItem
            key={itemPath}
            path={itemPath}
            {...itemProps}
        />
    )

    const itemsList = (
        <List>
            {Object.entries(appRoutes).map(renderItem)}
        </List>
    );

    return (
        <Box>
            {itemsList}
        </Box>
    )
}

export default AppNavigation;
