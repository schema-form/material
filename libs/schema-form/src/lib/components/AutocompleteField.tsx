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

const filterOptions = (options: Option[], values: string[], multiple = false) => multiple
  ? options?.filter((option: Option) => !values?.includes?.(option?.value))
  : options;

function SimpleAutocompleteField(props: AutocompleteFieldProps) {
  const { value, multiple, options, onChange } = props;
  const filteredOptions = useMemo(() => filterOptions(options, value, multiple), [multiple, options, value]);

  const renderOption: AutocompleteFieldProps['renderOption'] = (props, option: Option) => {
    const selected = value instanceof Array
      ? value.includes(option.value)
      : (value === option.value);
    const hasHelper = Boolean(option?.helperText);

    const helper = hasHelper ? (
      <Typography
        component="p"
        variant="caption"
        color="textSecondary"
      >
        {option?.helperText}
      </Typography>
    ) : null;

    return (
      <MenuItem
        dense={false}
        {...props}
        disabled={option?.disabled}
        selected={selected}
        value={option?.value}
      >
        <ListItemText
          primary={option?.label}
          secondary={helper}
        />
      </MenuItem>
    )
  }

  const renderInput: AutocompleteFieldProps['renderInput'] = (params) => (
    <TextField
      {...params}
      label={props?.label}
      error={props?.error}
      helperText={props?.helperText}
    />
  );

  const renderTags: AutocompleteFieldProps['renderTags'] = (selectedValues, getTagProps, ownerState) => {
    const selectedOptions = selectedValues.map(x => findOption(x, options));
    const renderTag = (option: Option | undefined, index: number) => {
      const tagProps = getTagProps({ index });
      const label = option?.label || JSON.stringify(option?.value);
      return (
        <Chip
          {...tagProps}
          label={label}
          disabled={props?.disabled || option?.disabled}
        />
      )
    };
    return selectedOptions?.map(renderTag);
  }

  const handleMultipleChange: AutocompleteFieldProps['onChange'] = (event, value, reason, details) => {
    const newValue = value instanceof Array
      ? value.map((option: Option) => option?.value ?? option)
      : []

    onChange?.(event, newValue, reason, details);
  }

  const handleSingleChange: AutocompleteFieldProps['onChange'] = (event, option, reason, details) => {
    const newValue = option?.value ?? option;
    onChange?.(event, newValue, reason, details);
  }

  return (
    <Autocomplete
      disabled={props.disabled}
      multiple={multiple}
      options={filteredOptions}
      noOptionsText="No options"
      getOptionLabel={(option: string | Option) => (option as Option)?.label ?? 'Unknown'}
      getOptionDisabled={(option: Option) => Boolean(option?.disabled)}
      renderOption={renderOption}
      renderInput={renderInput}
      renderTags={renderTags}
      onChange={multiple ? handleMultipleChange : handleSingleChange}
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
          console.log('!value', value);
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
