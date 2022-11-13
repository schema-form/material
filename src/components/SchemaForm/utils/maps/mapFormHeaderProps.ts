import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../../SchemaForm";
import {FormHeaderProps} from "../../components/FormHeader";

export function mapFormHeaderProps(props: WidgetProps<any, SchemaFormContext>): FormHeaderProps {
    const error = props.rawErrors?.[0];
    const hasError = Boolean(error);
    return {
        hidden: props.hidden,
        disabled: props.disabled,
        label: props.label,
        helperText: error || props.schema?.description,
        error: hasError
    }
}
