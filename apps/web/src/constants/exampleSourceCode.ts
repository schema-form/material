export const exampleSourceCode = `
import * as React from "react";
import SchemaForm, {SchemaFormProps} from "@schema-form/material";
import schema from './example-form.schema.json';
import uiSchema from './example-form.ui-schema.json';

export type ExampleFormData = {
    schema?: string;
    uiSchema?: string;
    formData?: string;
}

export type ExampleFormProps = Omit<SchemaFormProps, 'schema' | 'uiSchema'>;

export function ExampleForm(props: EditorFormProps) {
    const [formData, setFormData] = useState();

    return (
        <SchemaForm
            {...props}
            schema={schema}
            uiSchema={uiSchema}
            formData={formData}
            onChange={({ formData }) => setFormData(formData)}
            onSubmit={({ formData }) => { // post formData to API }}
        />
    );
}

export default EditorForm;
`;
