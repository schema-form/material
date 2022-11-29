import {ListItem, ListItemText, ListItemTextProps, Radio, RadioProps} from "@mui/material";
import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";

export type RadioListItemProps = RadioProps & {
    id?: RadioProps['id'];
    value?: RadioProps['value'];
    error?: boolean;
    disabled?: RadioProps['disabled'];
    checked?: RadioProps['checked'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['secondary'];
}

export function RadioListItem({
    value,
    label,
    helperText,
    error: hasError,
    disabled,
    checked,
    ...props
}: RadioListItemProps) {
    const hasLabel = Boolean(label);
    const hasHelperText = Boolean(helperText);
    const id = useMemo(() => props.id || uuid(), []);

    const primaryText = hasLabel && (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {label}
        </Typography>
    );

    const secondaryText = hasHelperText && (
        <Typography
            component="p"
            variant="caption"
            color={hasError ? 'error' : 'textSecondary'}
        >
            {helperText}
        </Typography>
    );

    return (
        <ListItem
            disableGutters={true}
            disablePadding={true}
        >
            <ListItemButton
                component="label"
                htmlFor={id}
                dense={true}
                disabled={disabled}
                selected={checked}
            >
                <ListItemIcon>
                    <Radio
                        id={id}
                        disableRipple
                        edge="start"
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        color={hasError ? 'error' : undefined}
                        onChange={props.onChange}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={primaryText}
                    secondary={secondaryText}
                />
            </ListItemButton>
        </ListItem>
    )
}

export default RadioListItem;
