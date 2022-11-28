import React from "react";
import {SchemaForm, SchemaFormProps} from "@schema-form/material";

const schema: SchemaFormProps['schema'] = {
    properties: {
        schema: {
            title: 'JSON Schema',
            type: 'string',
            contentMediaType: 'application/json'
        },
        formData: {
            title: 'Form data',
            type: 'string',
            contentMediaType: 'application/json'
        },
        uiSchema: {
            title: 'Ui Schema',
            type: 'string',
            contentMediaType: 'application/json'
        }
    }
}

export type EditorFormData = {
    schema?: string;
    uiSchema?: string;
    formData?: string;
}

export type EditorFormProps = Omit<SchemaFormProps, 'schema'>;

export function EditorForm(props: EditorFormProps) {
    return (
        <SchemaForm
            {...props}
            schema={schema}
        />
    )
}

export default EditorForm;
