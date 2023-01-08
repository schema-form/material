import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapDatePickerProps(props: WidgetProps<any, any, SchemaFormContext>): TextFieldProps {
    const commonProps = mapControlProps(props);
    const textFieldProps = mapTextFieldProps(props);
    const widgetProps = {
      ...commonProps,
      ...textFieldProps,
    };

    return {
        ...widgetProps,
        type: 'date',
        InputLabelProps: {
            ...widgetProps.InputLabelProps,
            shrink: true,
        }
    }
}

export default function DatePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const widgetProps = mapDatePickerProps(props);
    return <TextField {...widgetProps} data-testid="DatePickerWidget" />
}
