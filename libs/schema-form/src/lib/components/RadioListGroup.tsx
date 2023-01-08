import {JSONOption} from "../types/JSONOption";
import {v4 as uuid} from "uuid";
import isEqual from "lodash/isEqual";
import {
    RadioGroupProps,
    TextFieldProps
} from "@mui/material";
import List from "@mui/material/List";
import FormCard from "./FormCard";
import RadioListItem from "./RadioListItem";
import { useState } from "react";

export type RadioListGroupProps = RadioGroupProps & {
    options?: JSONOption[];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
}

export function RadioListGroup(props: RadioListGroupProps) {
    const {
        options = [],
        error: hasError,
        value,
        label,
        helperText,
        disabled,
    } = props;
    const [selectedOption, setSelectedOption] = useState<JSONOption>();

    const renderOption = (option: JSONOption) => {
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
                        setSelectedOption(option);
                        props.onChange?.(event, option.value);
                    } else {
                        setSelectedOption(undefined);
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

export default RadioListGroup;
