import React, {ReactNode} from "react";
import {useDrawerState} from "./DrawerProvider";
import Hidden from "@mui/material/Hidden";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuOpenOutlined from "@mui/icons-material/MenuOpenOutlined";
import MenuOutlined from "@mui/icons-material/MenuOutlined";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

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
