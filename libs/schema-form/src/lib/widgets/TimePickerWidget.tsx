import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {DesktopTimePicker, DesktopTimePickerProps, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

const TIME_FORMAT = 'HH:mm:ssZ';

export function mapTimePickerProps(props: WidgetProps<any, any, SchemaFormContext>): DesktopTimePickerProps<Dayjs, Dayjs> {
  const commonProps = mapControlProps(props);
  const { value: _, onChange, ...textFieldProps } = mapTextFieldProps(props);
  const timePickerValue = props?.value ? dayjs(props?.value, TIME_FORMAT) : null;

  return {
    ...commonProps,
    value: timePickerValue,
    // inputFormat: DATE_INPUT_FORMAT,
    renderInput: (params) => (
      <TextField
        {...textFieldProps}
        {...params}
        error={textFieldProps?.error}
        helperText={commonProps?.helperText}
      />
    ),
    onChange: (dateValue, inputValue) => {
      try {
        const newValue = dateValue?.format(TIME_FORMAT) ?? null;
        props.onChange(newValue);
      } catch (e) {
        props.onChange('Invalid Date');
      }
    }
  }
}

export default function TimePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
  const widgetProps = mapTimePickerProps(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopTimePicker {...widgetProps} />
    </LocalizationProvider>
  );
}
