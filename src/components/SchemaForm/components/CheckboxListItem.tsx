import {
    Checkbox,
    CheckboxProps, ListItem,
    ListItemText,
    TextFieldProps
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";

export type CheckboxListItemProps = CheckboxProps & {
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    error?: TextFieldProps['error'];
}

export function CheckboxListItem({ label, helperText, error: hasError, ...props }: CheckboxListItemProps) {
    const id = useMemo(uuid, []);
    const hasLabel = Boolean(label);
    const hasHelperText = Boolean(helperText);

    const primaryText = hasLabel ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {label}
        </Typography>
    ) : null;

    const secondaryText = hasHelperText ? (
        <Typography
            component="p"
            variant="caption"
            color={hasError ? 'error' : 'textSecondary'}
        >
            {helperText}
        </Typography>
    ) : null;

    return (
        <ListItem
            component="label"
            htmlFor={id}
            disabled={props.disabled}
            hidden={props.hidden}
            disableGutters={true}
            disablePadding={true}
            sx={{cursor: 'pointer'}}
        >
            <Checkbox
                {...props}
                id={id}
                sx={{mr: 1}}
                edge="start"
                color={hasError ? 'error' : undefined}
            />
            <ListItemText
                sx={{my: 0}}
                primary={primaryText}
                secondary={secondaryText}
            />
        </ListItem>
    )
}
