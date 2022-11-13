import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, {AutocompleteProps} from '@mui/material/Autocomplete';
import {WidgetProps} from "@rjsf/utils";
import {Chip, ListItemText, MenuItem} from "@mui/material";
import {EnumOption, mapEnumOptions} from "../utils/maps/mapEnumOptions";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapTextFieldProps} from "./TextFieldWidget";
import isEmpty from "lodash/isEmpty";
import {SchemaFormContext} from "../SchemaForm";

type Props = AutocompleteProps<EnumOption, any, any, any>;

export function mapAutocompleteProps(props: WidgetProps<any, SchemaFormContext>): AutocompleteProps<any, any, any, any> {
    const { value, multiple, onChange, formContext } = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const commonProps = mapControlProps(props);
    const enumOptions = mapEnumOptions(props);
    const findOption = (value: any) => enumOptions?.find(option => option?.value === value);
    const { value: _, onChange: __, type, ...textFieldProps } = mapTextFieldProps(props);
    const hasValue = !isEmpty(value);

    const renderOption: Props['renderOption'] = (props, option) => {
        const { label, description, disabled } = option;

        return (
            <MenuItem dense={dense} disabled={disabled} {...props}>
                <ListItemText
                    primary={label}
                    secondary={description}
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
        const selectedOptions = tagValues.map(findOption);
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
        const getValue = (option: EnumOption) => option?.value ?? option;
        const value = (options instanceof Array)
            ? (options as EnumOption[]).map(getValue)
            : (options as EnumOption)?.value

        onChange?.(value);
    }

    const handleInputChange: Props['onInputChange'] = (event, value) => {
      onChange?.(value);
    }

    return {
        ...commonProps,
        multiple,
        options: enumOptions,
        noOptionsText: 'No options',
        value: multiple ? value : findOption(value)?.value,
        getOptionLabel: option => option?.label,
        getOptionDisabled: option => option?.disabled,
        renderOption,
        renderInput,
        renderTags,
        onChange: handleChange,
        onInputChange: handleInputChange
    }
}

export default function AutocompleteWidget(props: WidgetProps<any, SchemaFormContext>) {
    const autocompleteProps = mapAutocompleteProps(props);
    return <Autocomplete {...autocompleteProps} data-testid="AutocompleteWidget" />;
}
