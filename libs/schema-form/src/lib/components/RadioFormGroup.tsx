import {v4 as uuid} from "uuid";
import isEqual from "lodash/isEqual";
import {
    RadioGroupProps,
    TextFieldProps
} from "@mui/material";
import List from "@mui/material/List";
import FormCard from "./FormCard";
import RadioListItem from "./RadioListItem";
import {useMemo} from "react";
import {toJSONOptions} from "../utils/toJSONOptions";
import {Option} from "../types/Option";

export type RadioFormGroupProps = RadioGroupProps & {
    options?: Option[];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
}

function SimpleRadioFormGroup(props: RadioFormGroupProps) {
    const {
        options = [],
        error: hasError,
        value,
        label,
        helperText,
        disabled,
        onChange,
    } = props;
    const selectedOption = useMemo(() => options.find(option => option.value === value), [options, value]);

    const renderOption = (option: Option) => {
        const id = uuid();
        const disabled = props.disabled || option.disabled;
        const checked = isEqual(value, option?.value);

        return (
            <RadioListItem
                key={id}
                id={id}
                checked={checked}
                disabled={disabled}
                value={option?.value}
                label={option?.label}
                helperText={option?.helperText}
                onChange={(event, checked) => {
                    if (checked) {
                        onChange?.(event, option.value);
                    }
                }}
            />
        )
    }

    return (
        <FormCard
            isControl={true}
            disabled={disabled}
            error={hasError}
            title={label}
            subheader={selectedOption?.label}
            helperText={helperText}
        >
            <List>
                {options?.map(renderOption)}
            </List>
        </FormCard>
    );
}

export function RadioFormGroup({ onChange, options, value, ...props }: RadioFormGroupProps) {
  const jsonOptions = useMemo(() => toJSONOptions(options), [options]);
  const jsonValue = useMemo(() => JSON.stringify(value), [value]);

  return (
    <SimpleRadioFormGroup
      {...props}
      options={jsonOptions}
      value={jsonValue}
      onChange={(event, value) => {
        const newValue = JSON.parse(value);
        onChange?.(event, newValue);
      }}
    />
  )
}

export default RadioFormGroup;
