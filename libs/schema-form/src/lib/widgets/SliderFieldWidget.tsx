import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {SchemaFormContext} from "../SchemaForm";
import {SliderField, SliderFieldProps} from "../components/SliderField";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapSliderProps} from "./SliderWidget";

export function mapSliderFieldProps(props: WidgetProps<any, any, SchemaFormContext>): SliderFieldProps {
    const textFieldProps = mapTextFieldProps(props);
    const sliderProps = mapSliderProps(props);

    return {
        ...textFieldProps,
        SliderProps: sliderProps,
        onChange: (event, value) => props.onChange(value)
    }
}

export default function SliderFieldWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const sliderFieldProps = mapSliderFieldProps(props);
    return (
      <SliderField
        data-testid="SliderFieldWidget"
        {...sliderFieldProps}
      />
    )
}
