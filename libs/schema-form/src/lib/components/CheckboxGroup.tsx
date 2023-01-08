import List from "@mui/material/List";
import {TextFieldProps} from "@mui/material/TextField";
import {CheckboxListItem, CheckboxListItemProps} from "./CheckboxListItem";
import FormCard from "./FormCard";
import {JSONOption} from "../types/JSONOption";
import {useMemo} from "react";

export type CheckboxGroupProps = {
    options: JSONOption[];
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

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { options, value, label, helperText, error: hasError, disabled } = props;
    const hasOptions = Boolean(options.length);
    const selectedOptions = useMemo(() => value?.map(value => {
      return options.find(option => option.value === value);
    }), [options, value]);
    const subheader = selectedOptions?.map(option => option?.label).join(', ');

    const createHandleOptionChange = (option: JSONOption): CheckboxListItemProps['onChange'] => (event, checked) => {
        const oldValue = value instanceof Array ? value : [];
        const newValue = checked
            ? [...oldValue, option?.value]
            : oldValue?.filter(item => item !== option?.value);
        const changeEvent = { target: { value: newValue } };
        props.onChange?.(changeEvent, newValue);
    }

    const renderOption = (option: JSONOption) => {
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

export default CheckboxGroup;
