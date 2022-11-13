import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {EnumOption} from "../utils/maps/mapEnumOptions";
import {SchemaFormContext} from "../SchemaForm";
import {CheckboxGroup, CheckboxGroupProps} from "../components/CheckboxGroup";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {CheckboxGroupOptionProps} from "../components/CheckboxGroupOption";

export function mapCheckboxGroupOptionProps(props: EnumOption): CheckboxGroupOptionProps {
    return {
        value: props.value,
        disabled: props.disabled,
        label: props.label,
        helperText: props.description,
    }
}

export function mapCheckboxGroupProps(props: WidgetProps<any, SchemaFormContext>): CheckboxGroupProps {
    const commonProps = mapControlProps(props);
    const options = props.options?.enumOptions?.map(mapCheckboxGroupOptionProps) || [];

    return {
        label: commonProps.label,
        helperText: commonProps.helperText,
        error: commonProps.error,
        disabled: commonProps.disabled,
        value: commonProps.value,
        onChange: (event, value) => {
            props.onChange(value);
        },
        options,
    }
}

export default function CheckboxGroupWidget(props: WidgetProps<any, SchemaFormContext>) {
    const checkboxGroupProps = mapCheckboxGroupProps(props);

    return (
        <CheckboxGroup
            data-testid="CheckboxGroupWidget"
            {...checkboxGroupProps}
        />
    );
}
