import {SchemaForm, SchemaFormProps} from "../components/SchemaForm";
import * as React from "react";
import {useAppRoute} from "./AppRoutesProvider";

const schema: SchemaFormProps['schema'] = {
    properties: {
        schema: {
            title: 'JSON Schema',
            type: 'string',
            contentMediaType: 'application/json'
        },
        uiSchema: {
            title: 'Ui Schema',
            type: 'string',
            contentMediaType: 'application/json'
        },
        formData: {
            title: 'Form data',
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
    const appRoute = useAppRoute();
    const fileName = appRoute.pathname.split('/').splice(-1).join('');

    return (
        <SchemaForm
            {...props}
            schema={schema}
        />
    )
}

export default EditorForm;
