import {WidgetProps} from "@rjsf/utils";
import {FormHelperTextProps} from "@mui/material";
import {SchemaFormContext} from "../../SchemaForm";

export function mapFormHelperTextProps(props: WidgetProps<any, SchemaFormContext>): FormHelperTextProps {
    const { schema, rawErrors } = props;
    const { description } = schema || {};
    const error = rawErrors?.[0];
    const hasError = Boolean(error);

    return {
        error: hasError,
        children: error || description
    }
}
