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
import {EnumOption, mapSelectOptions} from "../utils/maps/mapSelectOptions";
import List from "@mui/material/List";
import {SchemaFormContext} from "../SchemaForm";
import {mapFormHeaderProps} from "../utils/maps/mapFormHeaderProps";
import {FormHeader} from "../components/FormHeader";
import FormControl from "@mui/material/FormControl";
import {mapFormHelperTextProps} from "../utils/maps/mapFormHelperTextProps";
import isEqual from "lodash/isEqual";
import ListItemIcon from "@mui/material/ListItemIcon";
import Typography from "@mui/material/Typography";

export function RadioListGroup(props: WidgetProps<any, SchemaFormContext>) {
    const { value: inputValue, rawErrors, formContext} = props;
    const jsonValue = JSON.stringify(inputValue);
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const enumOptions = mapSelectOptions(props);
    const errorMessage = rawErrors?.[0];
    const hasError = Boolean(errorMessage);

    const renderOption = ({ value, label, description, disabled }: EnumOption) => {
        const id = uuid();
        const checked = isEqual(jsonValue, value);
        const hasLabel = Boolean(label);
        const hasDescription = Boolean(description);

        const labelText = hasLabel && (
            <Typography
                component="span"
                variant="body1"
                color={hasError ? 'error' : 'textPrimary'}
            >
                {label}
            </Typography>
        );

        const descriptionText = hasDescription && (
            <Typography
                component="p"
                variant="caption"
                color={hasError ? 'error' : 'textSecondary'}
            >
                {description}
            </Typography>
        );

        return (
            <ListItem
                key={value}
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
                        value={value}
                        disabled={disabled}
                        checked={checked}
                        color={hasError ? 'error' : undefined}
                    />
                </ListItemIcon>
                <ListItemText
                    primary={labelText}
                    secondary={descriptionText}
                />
            </ListItem>
        )
    }

    return (
        <List disablePadding={true}>
            {enumOptions?.map?.(renderOption)}
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
