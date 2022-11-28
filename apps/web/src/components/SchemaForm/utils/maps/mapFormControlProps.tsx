import {WidgetProps} from "@rjsf/utils";
import {FormControlProps} from "@mui/material";
import {mapControlProps} from "./mapControlProps";
import {SchemaFormContext} from "../../SchemaForm";

export function mapFormControlProps(props: WidgetProps<any, any, SchemaFormContext>): FormControlProps {
    const { onChange, onBlur, onFocus, ...commonProps } = mapControlProps(props);
    return {
        ...commonProps,
    }
}
