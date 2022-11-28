import React from "react";
import Tooltip from "@mui/material/Tooltip";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";
import {LightbulbOutlined, LightbulbTwoTone} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {IconButtonProps} from "@mui/material/IconButton";

export type MonacoEditorThemeToggleProps = Omit<IconButtonProps, 'onClick'>;

export function MonacoEditorThemeToggle(props: MonacoEditorThemeToggleProps) {
    const { size = 'small' } = props;
    const { setTheme, theme } = useMonacoEditorTheme();
    const isDarkTheme = theme === 'vs-dark';
    const Icon = isDarkTheme
        ? LightbulbTwoTone
        : LightbulbOutlined;
    const tooltip = isDarkTheme
        ? 'Switch to light mode'
        : 'Switch to dark mode';
    const iconColor = isDarkTheme
        ? '#ffb300'
        : 'inherit';
    const toggleTheme = () => setTheme(isDarkTheme
        ? 'light'
        : 'vs-dark');

    return (
        <Tooltip title={tooltip}>
            <IconButton
              {...props}
              size={size}
              onClick={toggleTheme}
            >
                <Icon fontSize={size} style={{ color: iconColor }} />
            </IconButton>
        </Tooltip>
    )
}

export default MonacoEditorThemeToggle;
