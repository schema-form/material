import React from "react";
import List from "@mui/material/List";
import {
    Checkbox, CheckboxProps,
    Divider,
    TextFieldProps
} from "@mui/material";
import {CheckboxGroupOption, CheckboxGroupOptionProps} from "./CheckboxGroupOption";
import FormCard from "./FormCard";

export type CheckboxGroupProps = {
    options: CheckboxGroupOptionProps[];
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
    const { options, value, label, helperText, error: hasError } = props;
    const selectedCount = Number(value?.length);
    const selectedText = selectedCount
        ? `${selectedCount} items selected`
        : 'not selected';
    const hasOptions = Boolean(options.length);

    const createHandleOptionChange = (option: CheckboxGroupOptionProps): CheckboxGroupOptionProps['onChange'] => (event, checked) => {
        const oldValue = value || [];
        const newValue = checked
            ? [...oldValue, option?.value]
            : oldValue?.filter(item => item !== option?.value);
        const changeEvent = { target: { value: newValue } };
        props.onChange?.(changeEvent, newValue);
    }

    const renderOption = (option: CheckboxGroupOptionProps) => {
        const key = JSON.stringify(option?.value);
        const checked = value?.includes(option?.value) || false;
        const disabled = props.disabled || option.disabled;

        return (
            <CheckboxGroupOption
                key={key}
                value={option?.value}
                disabled={disabled}
                checked={checked}
                label={option?.label}
                helperText={option.helperText}
                hidden={option.hidden}
                onChange={createHandleOptionChange(option)}
                error={hasError}
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
            focused={true}
            error={hasError}
            title={label}
            subheader={helperText || selectedText}
        >
            {optionsList}
        </FormCard>
    );
}

export default CheckboxGroup;
