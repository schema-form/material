import React from "react";
import {LightbulbOutlined, LightbulbTwoTone} from "@mui/icons-material";
import {styled, Tooltip} from "@mui/material";
import {useCodeTheme} from "./CodeThemeProvider";
import IconButton from "@mui/material/IconButton";

type StyledProps = {
    isDarkTheme: boolean;
}

const StyledIconButton = styled(IconButton)<StyledProps>(({ theme, isDarkTheme }) => ({
    minWidth: 'auto',
    color: isDarkTheme
        ? theme.palette.warning.light
        : theme.palette.common.black
}))

export function CodeThemeToggle() {
    const { theme = 'dark', toggleTheme } = useCodeTheme();
    const isDarkTheme = theme === 'dark';
    const Icon = isDarkTheme ? LightbulbTwoTone : LightbulbOutlined;

    return (
        <Tooltip
            title={`Switch to ${theme} mode`}
            placement="left"
            onClick={toggleTheme}
        >
            <StyledIconButton
                size='small'
                isDarkTheme={isDarkTheme}
                onClick={toggleTheme}
            >
                <Icon fontSize='small' />
            </StyledIconButton>
        </Tooltip>
    )
}

export default CodeThemeToggle;
