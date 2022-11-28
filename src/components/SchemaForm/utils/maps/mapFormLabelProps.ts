import {WidgetProps} from "@rjsf/utils";
import {FormLabelProps} from "@mui/material/FormLabel";
import {mapControlProps} from "./mapControlProps";
import {SchemaFormContext} from "../../SchemaForm";

export function mapFormLabelProps(props: WidgetProps<any, SchemaFormContext>): FormLabelProps {
    const { label, schema } = props;
    const { title } = schema;
    const { onFocus, onBlur, onChange, ...commonProps } = mapControlProps(props);
    return {
        ...commonProps,
        children: label || title
    }
}
