import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {
    ListItem, ListItemText, Radio,
    RadioGroup,
    RadioGroupProps
} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {EnumOption, mapSelectOptions} from "../utils/maps/mapSelectOptions";
import {toJSON} from "../utils/json";
import List from "@mui/material/List";
import {SchemaFormContext} from "../SchemaForm";
import {mapFormHeaderProps} from "../utils/maps/mapFormHeaderProps";
import {FormHeader} from "../components/FormHeader";

export function RadioListGroup(props: WidgetProps<any, SchemaFormContext>) {
    const { value: inputValue, onChange, formContext} = props;
    const { FormControlProps } = formContext || {};
    const { size } = FormControlProps || {};
    const dense = size === 'small';
    const enumOptions = mapSelectOptions(props);

    const renderOption = ({ value, label, description, disabled }: EnumOption) => {
        const key = JSON.stringify(value);
        const checked = toJSON(inputValue) === toJSON(value);

        return (
            <ListItem
                key={key}
                dense={dense}
                disabled={disabled}
                onClick={() => onChange(value)}
                disableGutters={true}
                disablePadding={true}
                sx={{cursor: 'pointer'}}
            >
                <Radio
                    sx={{mr: 1}}
                    edge="start"
                    size={size}
                    value={value}
                    disabled={disabled}
                    checked={checked}
                />
                <ListItemText
                    primary={label}
                    secondary={description}
                />
            </ListItem>
        )
    }

    return (
        <List disablePadding={true}>
            {enumOptions?.map?.(renderOption)}
        </List>
    );
}

export function mapRadioGroupProps(props: WidgetProps<any, SchemaFormContext>): RadioGroupProps {
    return {
        ...mapControlProps(props),
        children: RadioListGroup(props)
    }
}

export default function RadioGroupWidget(props: WidgetProps<any, SchemaFormContext>) {
    const radioGroupProps = mapRadioGroupProps(props);
    const formHeaderProps = mapFormHeaderProps(props);

    return (
        <div data-testid="RadioGroupWidget">
            <FormHeader {...formHeaderProps} />
            <RadioGroup {...radioGroupProps} />
        </div>
    );
}
