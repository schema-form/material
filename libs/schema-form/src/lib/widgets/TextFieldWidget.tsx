import React from 'react';
import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

function mapTextFieldInputMode({ schema }: WidgetProps<any, any, SchemaFormContext>): TextFieldProps['inputMode'] {
    const { type, format } = schema;
    switch (type) {
        case 'integer': return 'numeric';
        case 'number': return 'decimal';
        case 'string': {
            switch (format) {
                case 'url':
                case 'email':
                case 'tel':
                case 'search': return format;
            }
        }
    }
}

function mapTextFieldInputType({ schema }: WidgetProps<any, any, SchemaFormContext>): TextFieldProps['type'] {
    const { type, format } = schema;
    switch (type) {
        case 'integer':
        case 'number': return 'number';
        case 'string': {
            switch (format) {
                case 'url':
                case 'email':
                case 'password': return format;
                case 'date-time': return 'datetime-local';
                case 'data-url': return 'file';
            }
        }
    }
}

export function mapTextFieldProps(props: WidgetProps<any, any, SchemaFormContext>): TextFieldProps {
    return {
        ...mapControlProps(props),
        inputMode: mapTextFieldInputMode(props),
        type: mapTextFieldInputType(props)
    }
}

export default function TextFieldWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const textFieldProps = mapTextFieldProps(props);
    return <TextField {...textFieldProps} data-testid="TextFieldWidget" />;
}
