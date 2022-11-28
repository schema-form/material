import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {mapTextFieldProps} from "./TextFieldWidget";
import {TextField, TextFieldProps} from "@mui/material";
import {SchemaFormContext} from "../SchemaForm";

export function mapTimePickerProps(props: WidgetProps<any, any, SchemaFormContext>): TextFieldProps {
    const textFieldProps = mapTextFieldProps(props);
    return {
        ...textFieldProps,
        type: 'time',
        onChange: (event) => {
            const originValue = event.target.value;
            const isValidTime = originValue.match(/[0-9]{2}:[0-9]{2}/);
            const newValue = isValidTime ? `${originValue}:00` : originValue;
            props.onChange?.(newValue);
        }
    }
}

export default function TimePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const timePickerProps = mapTimePickerProps(props);
    return <TextField {...timePickerProps} data-testid="TimePickerWidget" />
}
