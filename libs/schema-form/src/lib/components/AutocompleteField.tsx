import React, {useMemo} from "react";
import {Chip, ListItemText, MenuItem, TextFieldProps} from "@mui/material";
import {Option} from "../types/Option";
import Autocomplete, {AutocompleteProps} from "@mui/material/Autocomplete";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import {toJSONOptions} from "../utils/toJSONOptions";

type TypedAutocompleteProps = AutocompleteProps<any, any, any, any>;

export type AutocompleteFieldProps = Omit<TypedAutocompleteProps, 'renderInput'> & {
  renderInput?: TypedAutocompleteProps['renderInput'];
  options?: Option[];
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: TextFieldProps['error'];
  disabled?: TextFieldProps['disabled'];
}

const findOption = (value: any, options: Option[]) => options?.find(option => option?.value === value);

function SimpleAutocompleteField(props: AutocompleteFieldProps) {
  const { value, multiple, options, onChange } = props;

  const renderOption: AutocompleteFieldProps['renderOption'] = (props, option) => {
    console.log('option:', props, option);
    const selected = value instanceof Array
      ? value.includes(option.value)
      : (value === option.value);
    const hasHelper = Boolean(option?.helperText);

    const helper = hasHelper && (
      <Typography
        component="p"
        variant="caption"
        color="textSecondary"
      >
        {option?.helperText}
      </Typography>
    );

    return (
      <MenuItem
        dense={false}
        disabled={option?.disabled}
        selected={selected}
        {...props}
      >
        <ListItemText
          primary={option?.label}
          secondary={helper}
        />
      </MenuItem>
    )
  }

  const renderInput: AutocompleteFieldProps['renderInput'] = (params) => {
    return (
      <TextField
        InputLabelProps={params?.InputLabelProps}
        InputProps={{
          ...params?.InputProps,
          endAdornment: (
            <React.Fragment>
              {params?.InputProps?.endAdornment}
            </React.Fragment>
          ),
          startAdornment: (
            <React.Fragment>
              {params?.InputProps?.startAdornment}
            </React.Fragment>
          )
        }}
      />
    )
  }

  const renderTags: AutocompleteFieldProps['renderTags'] = (tagValues, getTagProps, ownerState) => {
    const selectedOptions = tagValues.map(value => findOption(value, options));
    return selectedOptions?.map((option, index) => {
      const { value, disabled } = option || {};
      const tagProps = getTagProps({ index });
      const label = option?.label || option?.value;
      return (
        <Chip
          {...tagProps}
          key={value}
          label={label}
          disabled={props?.disabled || disabled}
        />
      )
    })
  }

  const handleChange: AutocompleteFieldProps['onChange'] = (event, options, reason, details) => {
    let newValue;

    const removeValue = (optionValue: any) => value instanceof Array
      ? value.filter(x => x !== optionValue)
      : undefined;

    switch (reason) {
      case 'selectOption': {
        const selectedOption = details?.option;
        const selectedOptionValue = selectedOption?.value as string;

        if (multiple) {
          const needRemove = value instanceof Array
            ? value?.includes(selectedOptionValue)
            : (value === selectedOptionValue);

          if (needRemove) {
            newValue = removeValue(selectedOptionValue);
            break;
          }

          newValue = value instanceof Array
            ? [...value, selectedOptionValue]
            : [selectedOptionValue];
        } else {
          newValue = selectedOptionValue;
        }
        break;
      }
      case 'removeOption': {
        const selectedOptionValue = details?.option as any;
        newValue = removeValue(selectedOptionValue);
        break;
      }
    }

    onChange?.(event, newValue, reason, details);
  }

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      noOptionsText="No options"
      getOptionLabel={option => (option as Option)?.label ?? 'Unknown'}
      getOptionDisabled={option => props?.disabled || option?.disabled}
      renderOption={renderOption}
      renderInput={renderInput}
      renderTags={renderTags}
      onChange={handleChange}
      value={value}
    />
  );
}

function toJSONValue(value: unknown) {
  return value instanceof Array
    ? value?.map(x => JSON.stringify(x))
    : JSON.stringify(value);
}

export function AutocompleteField({ value, onChange, options, ...props }: AutocompleteFieldProps) {
  const jsonOptions = useMemo(() => toJSONOptions(options), [options]);
  const jsonValues = useMemo(() => toJSONValue(value), [value]);

  return (
    <SimpleAutocompleteField
      {...props}
      options={jsonOptions}
      value={jsonValues}
      onChange={(event, value, reason, details) => {
        if (value instanceof Array) {
          const newValue = value.map((x) => JSON.parse(x));
          onChange?.(event, newValue, reason, details);
        } else {
          const newValue = JSON.parse(value as string);
          onChange?.(event, newValue, reason, details);
        }
      }}
    />
  );
}

export default AutocompleteField;
