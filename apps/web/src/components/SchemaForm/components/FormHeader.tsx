import React, {ReactNode} from "react";
import {ListItemText, ListItemTextProps} from "@mui/material";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";

export type FormHeaderProps = {
    className?: string;
    hidden?: boolean;
    error?: boolean;
    disabled?: boolean;
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['secondary'];
    secondaryAction?: ReactNode;
}

export function FormHeader(props: FormHeaderProps) {
    const hasLabel = Boolean(props.label);
    const hasHelperText = Boolean(props.helperText);

    const label = hasLabel ? (
        <Typography
            component="legend"
            variant="body1"
            color={props.error ? 'error' : 'textPrimary'}
            sx={{p: 0}}
        >
            {props?.label}
        </Typography>
    ) : null;

    const helperText = hasHelperText ? (
        <Typography
            component="p"
            variant="body2"
            color={props.error ? 'error' : 'textSecondary'}
        >
            {props?.helperText}
        </Typography>
    ) : null;

    return (
        <ListItem
            component="header"
            className={props.className}
            hidden={props.hidden}
            disableGutters
            disablePadding
            disabled={props?.disabled}
            secondaryAction={props?.secondaryAction}
        >
            <ListItemText
                sx={{my: 0}}
                primary={label}
                secondary={helperText}
            />
        </ListItem>
    )
}
