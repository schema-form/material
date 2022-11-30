import {WidgetProps} from '@rjsf/utils';
import {TextField, TextFieldProps} from "@mui/material";
import {mapTextFieldProps} from "./TextFieldWidget";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapDateTimePickerProps(props: WidgetProps<any, any, SchemaFormContext>): TextFieldProps {
    const commonProps = mapControlProps(props);
    const textFieldProps = mapTextFieldProps(props);
    return {
        ...commonProps,
        ...textFieldProps,
        type: 'datetime-local',
        InputLabelProps: {
            shrink: true,
        },
        onChange: (event) => {
            const { value } = event?.target || {};
            const isEmptyString = value === '';
            const newValue = isEmptyString
                ? undefined
                : `${value}:00`;
            props?.onChange(newValue);
        }
    }
}

export default function DateTimePickerWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const widgetProps = mapDateTimePickerProps(props);
    return <TextField {...widgetProps} data-testid="DateTimePickerWidget" />
}
