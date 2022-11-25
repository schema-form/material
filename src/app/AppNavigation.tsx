import List from "@mui/material/List";
import {AppRouteProps, appRoutes} from "../constants/routes";
import ListItemIcon from "@mui/material/ListItemIcon";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import ListItemText from "@mui/material/ListItemText";
import * as React from "react";
import {Link, useLocation} from "react-router-dom";
import {Box, Collapse, MenuItem} from "@mui/material";
import isEmpty from "lodash/isEmpty";
import {useState} from "react";
import {useDrawerState} from "../components/Layout/DrawerProvider";
import Typography from "@mui/material/Typography";

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
    const paddingLeft = level * 2;

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

    const primaryText = hasChildren ? (
        <Typography variant="body1">
            {props?.title}
        </Typography>
    ) : (
        <Typography
            component="span"
            variant="body1"
            color={isSelected ? 'textPrimary' : 'textSecondary'}
        >
            {props?.title}
        </Typography>
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
            to={props.path}
            selected={isSelected}
            sx={{pl: paddingLeft}}
            onClick={closeDrawer}
        >
            <ListItemText primary={primaryText} />
        </MenuItem>
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
