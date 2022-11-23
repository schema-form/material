import {
    Checkbox,
    CheckboxProps, ListItem,
    ListItemButton, ListItemButtonProps,
    ListItemIcon,
    ListItemText,
    ListItemTextProps, Switch, SwitchProps,
    TooltipProps
} from "@mui/material";
import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";

export type SwitchListItemProps = {
    isGroupOption?: boolean;
    value?: SwitchProps['value'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['title'];
    disabled?: SwitchProps['disabled'];
    hidden?: SwitchProps['hidden'];
    checked?: SwitchProps['checked'];
    error?: boolean;
    onChange?: SwitchProps['onChange'];
    sx?: ListItemButtonProps['sx'];
}

export function SwitchListItem(props: SwitchListItemProps) {
    const {error: hasError, helperText, isGroupOption} = props;
    const labelText = props?.label || JSON.stringify(props?.value);
    const id = useMemo(uuid, []);

    const primaryText = labelText ? (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {labelText}
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
                    borderRadius: isGroupOption ? 0 : 1,
                    ...props?.sx
                }}
            >
                <ListItemIcon>
                    <Switch
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

export default SwitchListItem;
