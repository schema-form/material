import {useId, useMemo} from "react";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select, {SelectChangeEvent, SelectProps} from "@mui/material/Select";
import {TextFieldProps} from "@mui/material";
import isEqual from "lodash/isEqual";
import CheckIcon from "@mui/icons-material/Check";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import {Option} from "../types/Option";
import {toJSONOptions} from "../utils/toJSONOptions";

export type SelectFieldProps = Omit<SelectProps, 'children' | 'onChange'> & {
  label?: TextFieldProps['label'];
  helperText?: TextFieldProps['helperText'];
  error?: TextFieldProps['error'];
  disabled?: TextFieldProps['disabled'];
  options?: Option[];
  onChange?: (event: SelectChangeEvent<unknown>, value?: unknown | unknown[]) => void;
};

function SimpleSelectField(props: SelectFieldProps) {
  const { label, helperText, error, disabled, options, value, onChange, ...selectProps } = props;
  const labelId = useId();
  const hasLabel = Boolean(label);
  const hasHelperText = Boolean(helperText);
  const isMultiple = Boolean(selectProps?.multiple);
  const isDense = selectProps.size === 'small';

  const inputLabel = hasLabel && (
      <InputLabel
        id={labelId}
        error={error}
        disabled={disabled}
      >
        {label}
      </InputLabel>
  );

  const formHelperText = hasHelperText && (
    <FormHelperText
      error={error}
      disabled={disabled}
    >
      {helperText}
    </FormHelperText>
  );

  const renderOption = (option: Option) => {
    const checked = value instanceof Array
      ? value.includes(option?.value)
      : isEqual(value, option?.value);

    const checkedIcon = checked && (
      <CheckIcon />
    );

    const listItemIcon = isMultiple && (
      <ListItemIcon>
        {checkedIcon}
      </ListItemIcon>
    );

    return (
      <MenuItem
        key={option?.value}
        dense={isDense}
        value={option?.value}
        disabled={disabled || option?.disabled}
      >
        {listItemIcon}
        <ListItemText
          primary={option?.label}
          secondary={option?.helperText}
        />
      </MenuItem>
    )
  }

  const getOptionLabelByValue = (itemValue?: string) => {
    const checkValueOption = (option: Option) => itemValue === option.value;
    const option = options?.find(checkValueOption);
    return option?.label ?? itemValue ?? '';
  }

  const renderValue: SelectFieldProps['renderValue'] = (value?: unknown | unknown[]) => {
    return value instanceof Array
      ? value?.map(getOptionLabelByValue).join(', ')
      : getOptionLabelByValue(value as string);
  }

  const handleChange: SelectProps['onChange'] = (event, child) => {
    onChange?.(event, event.target.value);
  };

  const select = (
    <Select
      label={label}
      labelId={labelId}
      error={error}
      disabled={disabled}
      value={value}
      renderValue={renderValue}
      onChange={handleChange}
      {...selectProps}
    >
      {options?.map(renderOption)}
    </Select>
  );

  return (
    <FormControl
      hiddenLabel={true}
      error={error}
      disabled={disabled}
      data-testid="SelectField"
      fullWidth={selectProps?.fullWidth}
    >
      {inputLabel}
      {select}
      {formHelperText}
    </FormControl>
  );
}

function toJSONValue(value: unknown) {
  return value instanceof Array
    ? value?.map(x => JSON.stringify(x))
    : JSON.stringify(value);
}

export function SelectField({ options, onChange, value, multiple, ...props }: SelectFieldProps) {
  const jsonOptions = useMemo(() => toJSONOptions(options), [options]);
  const jsonValue = useMemo(() => toJSONValue(value), [value]);

  return (
    <SimpleSelectField
      {...props}
      options={jsonOptions}
      value={jsonValue}
      multiple={multiple}
      onChange={(event, value) => {
        if (value instanceof Array) {
          const newValue = value.map((x) => JSON.parse(x));
          onChange?.(event, newValue);
        } else {
          const newValue = JSON.parse(value as string);
          onChange?.(event, newValue);
        }
      }}
    />
  )
}

export default SelectField;
