import {useDrawerState} from "./DrawerProvider";
import {Hidden, Stack} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {MenuOpenOutlined, MenuOutlined} from "@mui/icons-material";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import {ReactNode} from "react";

export type LayoutAppBarProps = {
    logo?: ReactNode;
    actions?: ReactNode;
}

export function LayoutAppBar(props: LayoutAppBarProps) {
    const { isDrawerOpen, toggleDrawer } = useDrawerState();

    const drawerToggle = (
        <Hidden lgUp>
            <IconButton
                edge="start"
                color="inherit"
                sx={{mr: 1}}
                onClick={toggleDrawer}
            >
                {isDrawerOpen ? <MenuOpenOutlined /> : <MenuOutlined/>}
            </IconButton>
        </Hidden>
    );

    const title = (
        <Typography variant="h6" noWrap component="div">
            {props.logo}
        </Typography>
    );

    const actions = (
        <Stack direction="row" sx={{ml: 'auto'}}>
            {props.actions}
        </Stack>
    )

    return (
        <AppBar position="sticky">
            <Toolbar>
                {drawerToggle}
                {title}
                {actions}
            </Toolbar>
        </AppBar>
    )
}

export default LayoutAppBar;
