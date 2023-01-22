import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {DesktopDatePicker, DesktopDatePickerProps, LocalizationProvider} from "@mui/x-date-pickers";
import {Dayjs} from "dayjs";
import {TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const DATE_FORMAT = 'YYYY-MM-DD';

export function mapDatePickerProps(props: WidgetProps<any, any, SchemaFormContext>): DesktopDatePickerProps<string, Dayjs> {
  const commonProps = mapControlProps(props);
  const { value, onChange, ...textFieldProps } = mapTextFieldProps(props);

  return {
    ...commonProps,
    inputFormat: DATE_FORMAT,
    renderInput: (params) => (
      <TextField
        {...textFieldProps}
        {...params}
        error={textFieldProps?.error}
        helperText={commonProps?.helperText}
      />
    ),
    onChange: (dateValue, inputValue) => {
      const newValue = dateValue?.format(DATE_FORMAT);
      props.onChange(newValue);
    }
  }
}

export default function DatePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
  const widgetProps = mapDatePickerProps(props);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker {...widgetProps} />
    </LocalizationProvider>
  );
}
