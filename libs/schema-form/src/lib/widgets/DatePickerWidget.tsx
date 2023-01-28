import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";
import {DesktopDatePicker, DesktopDatePickerProps, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs, {Dayjs} from "dayjs";
import {TextField} from "@mui/material";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const DATE_FORMAT = 'YYYY-MM-DD';

export function mapDatePickerProps(props: WidgetProps<any, any, SchemaFormContext>): DesktopDatePickerProps<Dayjs, Dayjs> {
  const commonProps = mapControlProps(props);
  const { value: _, onChange, ...textFieldProps } = mapTextFieldProps(props);
  const datePickerValue = props?.value ? dayjs(props?.value, DATE_FORMAT) : null;

  return {
    ...commonProps,
    value: datePickerValue,
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
        const newValue = dateValue?.format(DATE_FORMAT) ?? null;
        props.onChange(newValue);
      } catch (e) {
        props.onChange('Invalid Date');
      }
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
