import React, {PropsWithChildren, useContext, useState} from "react";

type DrawerContextValue = {
    isDrawerOpen: boolean;
    setDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
    closeDrawer: VoidFunction;
    openDrawer: VoidFunction;
    toggleDrawer: VoidFunction;
}

const DrawerContext = React.createContext<DrawerContextValue>({
    isDrawerOpen: false,
    setDrawerOpen: () => null,
    closeDrawer: () => null,
    openDrawer: () => null,
    toggleDrawer: () => null,
});

export type DrawerProviderProps = PropsWithChildren;

export function DrawerProvider(props: DrawerProviderProps) {
    const [isOpen, setOpen] = useState<boolean>(false);
    const close = () => setOpen(false);
    const open = () => setOpen(true);
    const toggle = () => setOpen(open => !open);

    return (
        <DrawerContext.Provider value={{
            isDrawerOpen: isOpen,
            setDrawerOpen: setOpen,
            closeDrawer: close,
            openDrawer: open,
            toggleDrawer: toggle
        }}>
            {props.children}
        </DrawerContext.Provider>
    )
}

export function useDrawerState() {
    return useContext(DrawerContext);
}
