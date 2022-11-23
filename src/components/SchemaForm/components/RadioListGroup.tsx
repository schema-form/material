import {Option} from "../types/Option";
import {v4 as uuid} from "uuid";
import isEqual from "lodash/isEqual";
import Typography from "@mui/material/Typography";
import {
    FormHelperText,
    FormLabel,
    ListItem,
    ListItemText, ListItemTextProps,
    Radio,
    RadioGroup, RadioGroupProps, RadioProps,
    TextFieldProps
} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import List from "@mui/material/List";
import React from "react";
import FormControl from "@mui/material/FormControl";

export type RadioListGroupProps = RadioGroupProps & {
    options?: Option[];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
}

export type RadioListGroupItemProps = RadioProps & {
    id?: RadioProps['id'];
    value?: RadioProps['value'];
    error?: boolean;
    disabled?: RadioProps['disabled'];
    checked?: RadioProps['checked'];
    label?: ListItemTextProps['primary'];
    helperText?: ListItemTextProps['secondary'];
}

export function RadioListGroupItem({
    value,
    label,
    helperText,
    error: hasError,
    disabled,
    checked,
    ...props
}: RadioListGroupItemProps) {
    const id = props?.id || uuid();
    const hasLabel = Boolean(label);
    const hasHelperText = Boolean(helperText);

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
            component="label"
            htmlFor={id}
            dense={true}
            disabled={disabled}
            disableGutters={true}
            disablePadding={true}
            sx={{cursor: 'pointer'}}
        >
            <ListItemIcon sx={{minWidth: 'auto'}}>
                <Radio
                    {...props}
                    id={id}
                    edge="start"
                    value={value}
                    disabled={disabled}
                    checked={checked}
                    color={hasError ? 'error' : undefined}
                />
            </ListItemIcon>
            <ListItemText
                primary={primaryText}
                secondary={secondaryText}
            />
        </ListItem>
    )
}

export function RadioListGroup({
    options = [],
    error: hasError,
    value,
    label,
    helperText,
    disabled,
    ...radioGroupProps
}: RadioListGroupProps) {
    const renderOption = (option: Option) => {
        const id = uuid();
        const checked = isEqual(value, option?.value);

        return (
            <RadioListGroupItem
                key={id}
                id={id}
                checked={checked}
                value={option?.value}
                disabled={option?.disabled}
                label={option?.label}
                helperText={option?.helperText}
            />
        )
    }

    const hasLabel = Boolean(label);
    const formLabel = hasLabel && (
        <FormLabel>{label}</FormLabel>
    );

    const hasHelperText = Boolean(helperText);
    const formHelperText = hasHelperText && (
        <FormHelperText>
            {helperText}
        </FormHelperText>
    );

    const radioGroup = (
        <RadioGroup {...radioGroupProps}>
            <List disablePadding={true}>
                {options?.map(renderOption)}
            </List>
        </RadioGroup>
    );

    return (
        <FormControl error={hasError} disabled={disabled}>
            {formLabel}
            {radioGroup}
            {formHelperText}
        </FormControl>
    )
}

export default RadioListGroup;
