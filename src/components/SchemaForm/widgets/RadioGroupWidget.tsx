import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {v4 as uuid} from 'uuid';
import {
    FormHelperText,
    ListItem, ListItemText, Radio,
    RadioGroup,
    RadioGroupProps
} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import List from "@mui/material/List";
import {SchemaFormContext} from "../SchemaForm";
import {mapFormHeaderProps} from "../utils/maps/mapFormHeaderProps";
import {FormHeader} from "../components/FormHeader";
import FormControl from "@mui/material/FormControl";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import isEqual from "lodash/isEqual";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";
import {mapOptions} from "../utils/maps/mapOptions";
import {Option} from "../types/Option";

export function RadioListGroup(props: WidgetProps<any, SchemaFormContext>) {
    const { value: inputValue, rawErrors, formContext} = props;
    const jsonValue = JSON.stringify(inputValue);
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const options = mapOptions(props);
    const errorMessage = rawErrors?.[0];
    const hasError = Boolean(errorMessage);

    const renderOption = (option: Option) => {
        const { label, helperText, disabled } = option;
        const id = uuid();
        const checked = isEqual(jsonValue, option?.value);
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
                key={option?.value}
                component="label"
                htmlFor={id}
                dense={dense}
                disabled={disabled}
                disableGutters={true}
                disablePadding={true}
                sx={{cursor: 'pointer'}}
            >
                <ListItemIcon sx={{minWidth: 'auto'}}>
                    <Radio
                        id={id}
                        edge="start"
                        size={size}
                        value={option?.value}
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

    return (
        <List disablePadding={true}>
            {options?.map?.(renderOption)}
        </List>
    );
}

export function mapRadioGroupProps(props: WidgetProps<any, SchemaFormContext>): RadioGroupProps {
    return {
        ...mapControlProps(props),
        children: RadioListGroup(props),
        onChange: (event) => {
            const jsonValue = event.target?.value;
            const hasJsonValue = Boolean(jsonValue);
            const newValue = hasJsonValue ? JSON.parse(jsonValue) : jsonValue;
            console.log('!jsonValue', jsonValue, newValue);
            props.onChange?.(newValue);
        }
    }
}

export default function RadioGroupWidget(props: WidgetProps<any, SchemaFormContext>) {
    const radioGroupProps = mapRadioGroupProps(props);
    const formHeaderProps = mapFormHeaderProps(props);
    const formHelperProps = mapFormHelperTextProps(props);

    return (
        <FormControl data-testid="RadioGroupWidget">
            <FormHeader
                {...formHeaderProps}
                helperText={null}
            />
            <RadioGroup {...radioGroupProps} />
            <FormHelperText {...formHelperProps} />
        </FormControl>
    );
}
