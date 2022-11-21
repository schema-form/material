import {WidgetProps} from "@rjsf/utils";
import {SchemaFormContext} from "../../SchemaForm";

export function mapControlProps(props: WidgetProps<any, SchemaFormContext>) {
    const {
        formContext, disabled, readonly, multiple, required, label, tabIndex, className, id, value, rawErrors, schema, onBlur, onFocus, onChange
    } = props;
    const { FormControlProps } = formContext || {};
    const { enumOptions, ...options } = props.options || {};
    const error = rawErrors?.[0];
    const hasError = Boolean(error);
    return {
        ...options,
        ...FormControlProps,
        multiple,
        fullWidth: true,
        hidden: props.hidden,
        disabled: disabled || readonly,
        max: schema.maximum || schema.exclusiveMaximum,
        min: schema.minimum || schema.exclusiveMinimum,
        step: schema.multipleOf,
        className,
        tabIndex,
        value,
        required,
        label: label || schema.title,
        placeholder: (schema.examples as string[])?.[0],
        helperText: error || schema.description,
        error: hasError,
        onBlur: () => onBlur(id, value),
        onFocus: () => onFocus(id, value),
        onChange: (event: any) => onChange(event?.target?.value)
    };
}
