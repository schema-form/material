import * as React from "react";
import {BottomNavigation, BottomNavigationAction, Drawer, Hidden, styled} from "@mui/material";
import {PropsWithChildren, ReactNode, useState} from "react";
import {HomeOutlined, SettingsOutlined} from "@mui/icons-material";
import {DrawerProvider, useDrawerState} from "./DrawerProvider";
import LayoutAppBar, {LayoutAppBarProps} from "./LayoutAppBar";

const DesktopRoot = styled('div')(({ theme }) => ({
    display: 'grid',
    height: '100vh',
    gridTemplateRows: 'auto 1fr'
}));

const MobileRoot = styled('div')(({ theme }) => ({
    display: 'grid',
    height: '100vh',
    gridTemplateRows: 'auto 1fr auto'
}));

const TabletBody = styled('main')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    overflow: 'hidden',
    '& > *': {
        overflow: 'auto',
    },
}));

const DesktopBody = styled('main')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '280px 1fr 1fr',
    overflow: 'hidden',
    '& > *': {
        overflow: 'auto',
    },
}));

const Main = styled('main')(({ theme }) => ({
    overflow: 'auto'
}));

const RightSide = styled('aside')(({ theme }) => ({
    borderLeft: `1px solid ${theme.palette.divider}`
}));

const LeftSide = styled('aside')(({ theme }) => ({
    borderRight: `1px solid ${theme.palette.divider}`
}));

export type LayoutProps = PropsWithChildren<{
    drawer?: ReactNode;
    rightDrawer?: ReactNode;
    AppBarProps?: LayoutAppBarProps;
}>;

function TabletLayout(props: LayoutProps) {
    const { isDrawerOpen, closeDrawer } = useDrawerState();

    const drawer = (
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
            {props.drawer}
        </Drawer>
    )

    return (
        <DesktopRoot>
            <LayoutAppBar {...props.AppBarProps} />
            <TabletBody>
                {drawer}
                <Main>
                    {props.children}
                </Main>
                <RightSide>
                    {props.rightDrawer}
                </RightSide>
            </TabletBody>
        </DesktopRoot>
    )
}

function DesktopLayout(props: LayoutProps) {
    return (
        <DesktopRoot>
            <LayoutAppBar {...props.AppBarProps} />
            <DesktopBody>
                <LeftSide>
                    {props.drawer}
                </LeftSide>
                <Main>
                    {props.children}
                </Main>
                <RightSide>
                    {props.rightDrawer}
                </RightSide>
            </DesktopBody>
        </DesktopRoot>
    )
}

enum BottomNavigationActions {
    content,
    rightDrawer
}

function MobileLayout(props: LayoutProps) {
    const [activeAction, setActiveAction] = useState(BottomNavigationActions.content);
    const { isDrawerOpen, closeDrawer } = useDrawerState();

    const drawer = (
        <Drawer open={isDrawerOpen} onClose={closeDrawer}>
            {props.drawer}
        </Drawer>
    )

    const bottomNavigation = (
        <BottomNavigation
            sx={{borderTop: theme => `1px solid ${theme.palette.divider}`}}
            showLabels
            value={activeAction}
            onChange={(event, newValue) => {
                setActiveAction(newValue);
            }}
        >
            <BottomNavigationAction
                value={BottomNavigationActions.content}
                label="Form"
                icon={<HomeOutlined />}
            />
            <BottomNavigationAction
                value={BottomNavigationActions.rightDrawer}
                label="Editor"
                icon={<SettingsOutlined />}
            />
        </BottomNavigation>
    );

    const content = ({
        [BottomNavigationActions.content]: props.children,
        [BottomNavigationActions.rightDrawer]: props.rightDrawer
    })[activeAction];

    return (
        <MobileRoot>
            <LayoutAppBar {...props.AppBarProps} />
            {drawer}
            <Main>
                {content || props.children}
            </Main>
            {bottomNavigation}
        </MobileRoot>
    )
}

export function Layout(props: LayoutProps) {
    return (
        <DrawerProvider>
            <Hidden smUp>
                <MobileLayout {...props} />
            </Hidden>
            <Hidden smDown lgUp>
                <TabletLayout {...props} />
            </Hidden>
            <Hidden lgDown>
                <DesktopLayout {...props} />
            </Hidden>
        </DrawerProvider>
    )
}

export default Layout;
