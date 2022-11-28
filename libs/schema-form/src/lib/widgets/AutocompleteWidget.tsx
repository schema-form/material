import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {AutocompleteProps} from '@mui/material/Autocomplete';
import {WidgetProps} from "@rjsf/utils";
import {Chip, ListItemText, MenuItem} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapTextFieldProps} from "./TextFieldWidget";
import isEmpty from "lodash/isEmpty";
import {SchemaFormContext} from "../SchemaForm";
import {mapJSONOptions} from "../utils/maps/mapJSONOptions";
import {Option} from "../types/Option";
import Typography from "@mui/material/Typography";

type Props = AutocompleteProps<Option, any, any, any>;

const findOption = (value: any, values: Option[]) => values?.find(option => option?.value === value);

const parseJSONValue = (item: any) => {
    try { return JSON.parse(item) }
    catch(e) { return item }
}

export function mapAutocompleteProps(props: WidgetProps<any, any, SchemaFormContext>): AutocompleteProps<any, any, any, any> {
    const { value, multiple, onChange, formContext } = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const commonProps = mapControlProps(props);
    const jsonOptions = mapJSONOptions(props);
    const { value: _, onChange: __, type, ...textFieldProps } = mapTextFieldProps(props);
    const jsonValue = value instanceof Array
        ? value.map(item => JSON.stringify(item))
        : JSON.stringify(value);
    const hasValue = !isEmpty(value);

    const renderOption: Props['renderOption'] = (props, option) => {
        const { label, helperText, disabled, value } = option;
        const selected = jsonValue instanceof Array
            ? jsonValue.includes(value)
            : (jsonValue === value);

        const helper = (
            <Typography
                component="p"
                variant="caption"
                color="textSecondary"
            >
                {helperText}
            </Typography>
        );

        return (
            <MenuItem
                dense={false}
                disabled={disabled}
                selected={selected}
                {...props}
            >
                <ListItemText
                    primary={label}
                    secondary={helper}
                />
            </MenuItem>
        )
    }

    const renderInput: Props['renderInput'] = (params) => {
      return (
        <TextField
          {...textFieldProps}
          {...params}
          InputLabelProps={{
            ...textFieldProps?.InputLabelProps,
            ...params?.InputLabelProps,
          }}
          InputProps={{
            ...textFieldProps?.InputProps,
            ...params?.InputProps,
            endAdornment: (
              <React.Fragment>
                {hasValue ? null : textFieldProps?.InputProps?.endAdornment}
                {params?.InputProps?.endAdornment}
              </React.Fragment>
            ),
            startAdornment: (
              <React.Fragment>
                {textFieldProps?.InputProps?.startAdornment}
                {params?.InputProps?.startAdornment}
              </React.Fragment>
            )
          }}
        />
      )
    }

    const renderTags: Props['renderTags'] = (tagValues, getTagProps, ownerState) => {
        const selectedOptions = tagValues.map(value => findOption(value, jsonOptions));
        return selectedOptions?.map((option, index) => {
            const { value, disabled } = option || {};
            const tagProps = getTagProps({ index });
            const label = option?.label || option?.value;
            return (
                <Chip
                    {...tagProps}
                    key={value}
                    label={label}
                    disabled={disabled}
                />
            )
        })
    }

    const handleChange: Props['onChange'] = (event, options, reason, details) => {
        let newJSONValue;

        const removeValue = (value: any) => jsonValue instanceof Array
            ? jsonValue.filter(itemValue => itemValue !== value)
            : undefined;

        switch (reason) {
            case 'selectOption': {
                const selectedOption = details?.option;
                const selectedOptionValue = selectedOption?.value as string;

                if (multiple) {
                    const needRemove = jsonValue instanceof Array
                        ? jsonValue?.includes(selectedOptionValue)
                        : (jsonValue === selectedOptionValue);

                    if (needRemove) {
                        newJSONValue = removeValue(selectedOptionValue);
                        break;
                    }

                    newJSONValue = jsonValue instanceof Array
                        ? [...jsonValue, selectedOptionValue]
                        : [selectedOptionValue];
                } else {
                    newJSONValue = selectedOptionValue;
                }
                break;
            }
            case 'removeOption': {
                const selectedOptionValue = details?.option as any;
                newJSONValue = removeValue(selectedOptionValue);
                break;
            }
        }

        const newValue = newJSONValue instanceof Array
            ? newJSONValue.map(parseJSONValue)
            : parseJSONValue(newJSONValue);

        onChange?.(newValue);
    }

    return {
        ...commonProps,
        multiple,
        options: jsonOptions,
        noOptionsText: 'No options',
        value: jsonValue,
        getOptionLabel: option => option?.label,
        getOptionDisabled: option => option?.disabled,
        renderOption,
        renderInput,
        renderTags,
        onChange: handleChange
    }
}

export default function AutocompleteWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const autocompleteProps = mapAutocompleteProps(props);
    return <Autocomplete {...autocompleteProps} data-testid="AutocompleteWidget" />;
}
