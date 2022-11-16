import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {mapTextFieldProps} from "./TextFieldWidget";
import {TextField, TextFieldProps} from "@mui/material";
import {SchemaFormContext} from "../SchemaForm";

export function mapTimePickerProps(props: WidgetProps<any, SchemaFormContext>): TextFieldProps {
    const textFieldProps = mapTextFieldProps(props);
    return {
        ...textFieldProps,
        type: 'time'
    }
}

export default function TimePickerWidget(props: WidgetProps<any, SchemaFormContext>) {
    const timePickerProps = mapTimePickerProps(props);
    return <TextField {...timePickerProps} data-testid="TimePickerWidget" />
}
