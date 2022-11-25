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

type Props = AutocompleteProps<Option, any, any, any>;

const findOption = (value: any, values: Option[]) => values?.find(option => option?.value === value);

export function mapAutocompleteProps(props: WidgetProps<any, SchemaFormContext>): AutocompleteProps<any, any, any, any> {
    const { value, multiple, onChange, formContext } = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const commonProps = mapControlProps(props);
    const jsonOptions = mapJSONOptions(props);
    const { value: _, onChange: __, type, ...textFieldProps } = mapTextFieldProps(props);
    const hasValue = !isEmpty(value);

    const renderOption: Props['renderOption'] = (props, option) => {
        const { label, helperText, disabled } = option;

        return (
            <MenuItem dense={dense} disabled={disabled} {...props}>
                <ListItemText
                    primary={label}
                    secondary={helperText}
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

    const renderTags: Props['renderTags'] = (tagValues, getTagProps) => {
        const selectedOptions = tagValues.map(value => findOption(value, jsonOptions));
        return selectedOptions?.map((option, index) => {
            const { label, value, disabled } = option || {};
            const tagProps = getTagProps({ index });
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

    const handleChange: Props['onChange'] = (event, options) => {
        const getValue = (option: Option) => JSON.parse(option?.value ?? option);
        const value = (options instanceof Array)
            ? (options as Option[]).map(getValue)
            : JSON.parse((options as Option)?.value)

        onChange?.(value);
    }

    return {
        ...commonProps,
        multiple,
        options: jsonOptions,
        noOptionsText: 'No options',
        value: multiple ? value : findOption(value, jsonOptions)?.value,
        getOptionLabel: option => option?.label,
        getOptionDisabled: option => option?.disabled,
        renderOption,
        renderInput,
        renderTags,
        onChange: handleChange
    }
}

export default function AutocompleteWidget(props: WidgetProps<any, SchemaFormContext>) {
    const autocompleteProps = mapAutocompleteProps(props);
    return <Autocomplete {...autocompleteProps} data-testid="AutocompleteWidget" />;
}
