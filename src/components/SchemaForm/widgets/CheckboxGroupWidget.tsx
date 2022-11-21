import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {CheckboxGroup, CheckboxGroupProps} from "../components/CheckboxGroup";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapOptions} from "../utils/maps/mapOptions";

const fromJSON = (value: any) => (typeof value === 'string')
    ? JSON.parse(value)
    : value;

const toJSON = (value: any) => JSON.stringify(value);

export function mapCheckboxGroupProps(props: WidgetProps<any, SchemaFormContext>): CheckboxGroupProps {
    const commonProps = mapControlProps(props);
    const checkboxOptions = mapOptions(props);

    return {
        label: commonProps.label,
        helperText: commonProps.helperText,
        error: commonProps.error,
        disabled: commonProps.disabled,
        value: commonProps.value?.map(toJSON),
        onChange: (event, value) => {
            const newValue = value?.map(fromJSON);
            props.onChange?.(newValue);
        },
        options: checkboxOptions,
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
