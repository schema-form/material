import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapDatePickerProps(props: WidgetProps<any, SchemaFormContext>): TextFieldProps {
    const commonProps = mapControlProps(props);
    const textFieldProps = mapTextFieldProps(props);
    return {
        ...commonProps,
        ...textFieldProps,
        type: 'date',
        InputLabelProps: {
            shrink: true,
        }
    }
}

export default function DatePickerWidget(props: WidgetProps<any, SchemaFormContext>) {
    const widgetProps = mapDatePickerProps(props);
    return <TextField {...widgetProps} data-testid="DatePickerWidget" />
}
