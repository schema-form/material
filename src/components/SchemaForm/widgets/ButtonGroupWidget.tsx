import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapButtonGroupProps(props: WidgetProps<any, SchemaFormContext>): TextFieldProps {
    return mapControlProps(props)
}

export default function ButtonGroupWidget(props: WidgetProps<any, SchemaFormContext>) {
    const widgetProps = mapButtonGroupProps(props);
    return <TextField {...widgetProps} data-testid="ButtonGroupWidget" />;
}
