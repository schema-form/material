import React from "react";
import List from "@mui/material/List";
import {
    TextFieldProps
} from "@mui/material";
import {CheckboxGroupOption, CheckboxGroupOptionProps} from "./CheckboxGroupOption";
import FormCard from "./FormCard";
import {Option} from "../types/Option";

export type CheckboxGroupProps = {
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

export function CheckboxGroup(props: CheckboxGroupProps) {
    const { options, value, label, helperText, error: hasError } = props;
    const hasOptions = Boolean(options.length);

    const createHandleOptionChange = (option: Option): CheckboxGroupOptionProps['onChange'] => (event, checked) => {
        const oldValue = value || [];
        const newValue = checked
            ? [...oldValue, option?.value]
            : oldValue?.filter(item => item !== option?.value);
        const changeEvent = { target: { value: newValue } };
        props.onChange?.(changeEvent, newValue);
    }

    const renderOption = (option: Option) => {
        const checked = value?.includes(option?.value) || false;
        const disabled = props.disabled || option.disabled;

        return (
            <CheckboxGroupOption
                key={option?.value}
                value={option?.value}
                disabled={disabled}
                checked={checked}
                label={option?.label}
                helperText={option.helperText}
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
            isControl={true}
            error={hasError}
            label={label}
            helperText={helperText}
        >
            {optionsList}
        </FormCard>
    );
}

export default CheckboxGroup;
