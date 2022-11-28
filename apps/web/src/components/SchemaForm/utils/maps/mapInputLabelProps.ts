import {WidgetProps} from "@rjsf/utils";
import {InputLabelProps} from "@mui/material";
import {SchemaFormContext} from "../../SchemaForm";

export function mapInputLabelProps(props: WidgetProps<any, any, SchemaFormContext>): InputLabelProps {
    const { label, schema } = props;
    const { title } = schema;
    return {
        children: label || title
    }
}
