import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/propsMaps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapDateTimePickerProps(props: WidgetProps<any, any, SchemaFormContext>): TextFieldProps {
    const commonProps = mapControlProps(props);
    const textFieldProps = mapTextFieldProps(props);
    const widgetProps = {
      ...commonProps,
      ...textFieldProps,
    };

    return {
        ...widgetProps,
        type: 'datetime-local',
        InputLabelProps: {
            ...widgetProps.InputLabelProps,
            shrink: true,
        },
        onChange: (event) => {
            const { value } = event?.target || {};
            const isEmptyString = value === '';
            const newValue = isEmptyString
                ? null
                : `${value}:00`;
            props?.onChange(newValue);
        }
    }
}

export default function DateTimePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const widgetProps = mapDateTimePickerProps(props);
    return <TextField {...widgetProps} data-testid="DateTimePickerWidget" />
}
