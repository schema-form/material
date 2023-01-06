import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {TextField} from "@mui/material";
import {SchemaFormContext} from "../SchemaForm";

export function BaseInputTemplate(props: WidgetProps<any, any, SchemaFormContext>) {
    const { FormControlProps } = props.formContext || {};
    const error = props.rawErrors?.[0];
    const hasError = Boolean(error);

    return (
        <TextField
            variant={FormControlProps?.variant}
            size={FormControlProps?.size}
            className={props.className}
            autoFocus={props.autofocus}
            disabled={props.disabled}
            label={props.label}
            placeholder={props.placeholder}
            aria-readonly={props.readonly}
            tabIndex={props.tabIndex}
            required={props.required}
            hidden={props.hidden}
            value={props.value}
            onChange={(event) => props.onChange(event.target?.value)}
            onFocus={(event) => props.onFocus(event.target?.id, event.target?.value)}
            onBlur={(event) => props.onBlur(event.target?.id, event.target?.value)}
            error={hasError}
            helperText={error ?? props.schema?.description}
            fullWidth={true}
        />
    )
}

export default BaseInputTemplate;
