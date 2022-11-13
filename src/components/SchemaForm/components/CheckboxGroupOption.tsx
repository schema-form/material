import {
    Checkbox,
    CheckboxProps, ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    ListItemTextProps,
    Tooltip,
    TooltipProps
} from "@mui/material";
import React, {useMemo} from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";
import InfoIcon from "@mui/icons-material/InfoOutlined";

export type CheckboxGroupOptionProps = {
    value: CheckboxProps['value'];
    label?: ListItemTextProps['primary'];
    helperText?: TooltipProps['title'];
    disabled?: CheckboxProps['disabled'];
    hidden?: CheckboxProps['hidden'];
    checked?: CheckboxProps['checked'];
    error?: boolean;
    onChange?: CheckboxProps['onChange'];
}

export function CheckboxGroupOption(props: CheckboxGroupOptionProps) {
    const {error: hasError} = props;
    const labelText = props?.label || JSON.stringify(props?.value);
    const id = useMemo(uuid, []);

    const label = labelText && (
        <Typography
            component="span"
            variant="body1"
            color={hasError ? 'error' : 'textPrimary'}
        >
            {labelText}
        </Typography>
    );

    const helper = props.helperText && (
        <ListItemIcon sx={{minWidth: 'auto', mr: 1}}>
            <Tooltip title={props.helperText} placement="left">
                <InfoIcon
                    fontSize="small"
                    color={hasError ? 'error' : 'action'}
                    opacity={.7}
                />
            </Tooltip>
        </ListItemIcon>
    );

    return (
        <ListItem component="label" htmlFor={id} disablePadding>
            <ListItemButton
                disabled={props?.disabled}
                hidden={props?.hidden}
                sx={{py: 0}}
            >
                <ListItemIcon>
                    <Checkbox
                        id={id}
                        disableRipple
                        edge="start"
                        checked={props.checked}
                        value={props.value}
                        onChange={props.onChange}
                        sx={{mr: 1}}
                        color={hasError ? 'error' : undefined}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={label}
                />
                {helper}
            </ListItemButton>
        </ListItem>
    )
}
