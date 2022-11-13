import {ListItemButton, ListItemButtonProps, ListItemIcon, ListItemText, ListItemTextProps} from "@mui/material";
import React, {ReactNode} from "react";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export type FormCardHeaderProps = {
    className?: string;
    hidden?: boolean;
    error?: boolean;
    disabled?: boolean;
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['secondary'];
    secondaryAction?: ReactNode;
    expanded?: boolean;
    onClick?: ListItemButtonProps['onClick'];
}

export function FormCardHeader(props: FormCardHeaderProps) {
    const hasLabel = Boolean(props.label);
    const hasHelperText = Boolean(props.helperText);

    const label = hasLabel && (
        <Typography
            component="legend"
            variant="body1"
            sx={{p: 0}}
        >
            {props?.label}
        </Typography>
    );

    const helperText = hasHelperText && (
        <Typography
            component="p"
            variant="body2"
            color={props.error ? 'error' : 'textSecondary'}
        >
            {props?.helperText}
        </Typography>
    )

    return (
        <ListItem
            className={props.className}
            hidden={props.hidden}
            disablePadding
            secondaryAction={props?.secondaryAction}
        >
            <ListItemButton disabled={props.disabled}>
                <ListItemText
                    primary={label}
                    secondary={helperText}
                />
                <ListItemIcon sx={{minWidth: 'auto'}}>
                    {props.expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                </ListItemIcon>
            </ListItemButton>
        </ListItem>
    )
}

export default FormCardHeader;
