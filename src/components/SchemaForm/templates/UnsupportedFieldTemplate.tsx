import React from 'react';
import {Alert, AlertTitle} from "@mui/material";
import {UnsupportedFieldProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";

export function UnsupportedFieldTemplate(props: UnsupportedFieldProps) {
    const { schema, reason, idSchema } = props || {};
    const { $id } = idSchema || {};
    const jsonSchema = JSON.stringify(schema, null, 2);

    const message = reason && (
        <Typography
            variant="body2"
            component="p"
            color="textSecondary"
        >
            {reason}
        </Typography>
    );

    const code = jsonSchema && (
        <pre>
            <code>{jsonSchema}</code>
        </pre>
    );

    return (
        <Alert severity="error">
            <AlertTitle>Схема не поддерживается для "{$id}"</AlertTitle>
            {message}
            {code}
        </Alert>
    );
}

export default UnsupportedFieldTemplate;
