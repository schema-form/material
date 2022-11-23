import {
    Checkbox,
    CheckboxProps, ListItem,
    ListItemButton, ListItemButtonProps,
    ListItemIcon,
    ListItemText,
    ListItemTextProps,
} from "@mui/material";
import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";

export type CheckboxListItemProps = {
    isGroupOption?: boolean;
    value?: CheckboxProps['value'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['title'];
    disabled?: CheckboxProps['disabled'];
    hidden?: CheckboxProps['hidden'];
    checked?: CheckboxProps['checked'];
    error?: boolean;
    onChange?: CheckboxProps['onChange'];
    sx?: ListItemButtonProps['sx'];
}

export function CheckboxListItem(props: CheckboxListItemProps) {
    const id = useMemo(uuid, []);
    const {error: hasError, helperText, isGroupOption} = props;
    const label = props?.label || JSON.stringify(props?.value);
    const optionPaddingY = helperText ? undefined : 0;

    const primaryText = label ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {label}
        </Typography>
    ) : null;

    const secondaryText = helperText ? (
        <Typography
            component="p"
            variant="caption"
            color={hasError ? 'error' : 'textSecondary'}
        >
            {helperText}
        </Typography>
    ) : null;

    return (
        <ListItem disablePadding>
            <ListItemButton
                component="label"
                htmlFor={id}
                disabled={props?.disabled}
                selected={props.checked}
                hidden={props?.hidden}
                sx={{
                    py: isGroupOption ? optionPaddingY : undefined,
                    borderRadius: isGroupOption ? 0 : 1,
                    ...props.sx
                }}
            >
                <ListItemIcon>
                    <Checkbox
                        id={id}
                        disableRipple
                        edge="start"
                        disabled={props.disabled}
                        checked={props.checked}
                        value={props.value}
                        onChange={props.onChange}
                        color={hasError ? 'error' : undefined}
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

export default CheckboxListItem;
