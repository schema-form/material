import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import TimePicker, {TimePickerProps} from "@mui/lab/TimePicker";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {mapTextFieldProps} from "./TextFieldWidget";
import {TextField} from "@mui/material";
import {format} from "date-fns";
import {SchemaFormContext} from "../SchemaForm";

export function mapTimePickerProps(props: WidgetProps<any, SchemaFormContext>): TimePickerProps<Date> {
    const inputFormat = 'hh:mm:ss';
    const commonProps = mapControlProps(props);
    const textFieldProps = mapTextFieldProps(props);
    return {
        ...commonProps,
        inputFormat,
        renderInput: (params: any) => (
            <TextField
                {...textFieldProps}
                {...params}
            />
        ),
        onChange: (date: Date) => {
            const newValue = format(date, inputFormat);
            props?.onChange?.(newValue);
        },
    }
}

export default function TimePickerWidget(props: WidgetProps<any, SchemaFormContext>) {
    const timePickerProps = mapTimePickerProps(props);
    return <TimePicker {...timePickerProps} data-testid="TimePickerWidget" />
}
