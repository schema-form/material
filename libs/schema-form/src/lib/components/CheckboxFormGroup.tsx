import List from "@mui/material/List";
import {TextFieldProps} from "@mui/material/TextField";
import {CheckboxListItem, CheckboxListItemProps} from "./CheckboxListItem";
import FormCard from "./FormCard";
import {useMemo} from "react";
import {Option} from "../types/Option";
import {toJSONOptions} from "../utils/toJSONOptions";

export type CheckboxFormGroupProps = {
    options: Option[];
    value?: unknown[];
    onChange?: (event: {
        target?: {
            value?: unknown[]
        }
    }, value?: unknown[]) => void;
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
}

function getSelectedOptions(options: Option[], value: unknown[]): Option[] {
  const selectedOptions: Option[] = [];

  value?.forEach((x: unknown) => {
    const selectedOption = options.find(option => option.value === x);
    if (selectedOption) selectedOptions.push(selectedOption);
  });

  return selectedOptions;
}

function SimpleCheckboxFormGroup(props: CheckboxFormGroupProps) {
    const { options, label, helperText, error: hasError, disabled } = props;
    const value = useMemo(() => props.value || [], [props.value]);
    const selectedOptions = useMemo(() => getSelectedOptions(options, value), [options, value]);
    const hasOptions = Boolean(options.length);
    const subheader = selectedOptions?.map(option => option?.label).join(', ');

    const createHandleOptionChange = (option: Option): CheckboxListItemProps['onChange'] => (event, checked) => {
        const newValue = checked
            ? [...value, option?.value]
            : value?.filter(x => x !== option?.value);
        const changeEvent = { target: { value: newValue } };
        props.onChange?.(changeEvent, newValue);
    }

    const renderOption = (option: Option) => {
        const checked = value?.includes(option?.value) || false;
        const disabled = props.disabled || option.disabled;

        return (
            <CheckboxListItem
                key={option?.value}
                value={option?.value}
                disabled={disabled}
                checked={checked}
                label={option?.label}
                helperText={option.helperText}
                onChange={createHandleOptionChange(option)}
                error={hasError}
                isGroupOption={true}
            />
        )
    }

    const optionsList = hasOptions ? (
        <List>
            {options.map(renderOption)}
        </List>
    ) : null;

    return (
        <FormCard
            isControl={true}
            disabled={disabled}
            error={hasError}
            title={label}
            subheader={subheader}
            helperText={helperText}
        >
            {optionsList}
        </FormCard>
    );
}

function toJSONValue(value: unknown) {
  return value instanceof Array
    ? value?.map(x => JSON.stringify(x))
    : [];
}

export function CheckboxFormGroup({ onChange, options, value, ...props }: CheckboxFormGroupProps) {
  const jsonOptions = useMemo(() => toJSONOptions(options), [options]);
  const jsonValues = useMemo(() => toJSONValue(value), [value]);

  return (
    <SimpleCheckboxFormGroup
      {...props}
      options={jsonOptions}
      value={jsonValues}
      onChange={(event, value) => {
        const newValue = value?.map((x) => JSON.parse(x as string));
        onChange?.(event, newValue);
      }}
    />
  )
}

export default CheckboxFormGroup;
