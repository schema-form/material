import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {DesktopDateTimePicker, DesktopDateTimePickerProps, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const DATE_TIME_INPUT_FORMAT = 'YYYY-MM-DD hh:mm';

export function mapDateTimePickerProps(props: WidgetProps<any, any, SchemaFormContext>): DesktopDateTimePickerProps<Dayjs, Dayjs> {
  const commonProps = mapControlProps(props);
  const { onChange, ...textFieldProps } = mapTextFieldProps(props);
  const dateTimePickerValue = props?.value ? dayjs(props?.value) : null;

  return {
    ...commonProps,
    value: dateTimePickerValue,
    // inputFormat: DATE_TIME_INPUT_FORMAT,
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
        const newValue = dateValue?.toISOString() ?? null;
        props.onChange(newValue);
      } catch (e) {
        props.onChange('Invalid Date');
      }
    }
  }
}

export default function DatePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
  const widgetProps = mapDateTimePickerProps(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDateTimePicker {...widgetProps} />
    </LocalizationProvider>
  );
}
