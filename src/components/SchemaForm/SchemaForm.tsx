import React from "react";
import validator from "@rjsf/validator-ajv8";
import Form, { FormProps } from "@rjsf/core";
import {FormControlProps, ButtonProps, styled} from "@mui/material";
import WIDGETS from "./widgets";
import TEMPLATES from "./templates";
import MonacoEditorThemeProvider from "./components/MonacoEditor/MonacoEditorThemeProvider";

export type SchemaFormContext = {
    FormControlProps?: {
        size?: FormControlProps['size'];
        variant?: FormControlProps['variant'];
        color?: FormControlProps['color'];
    };
    ButtonProps?: {
        size?: ButtonProps['size'];
        variant?: ButtonProps['variant'];
        color?: ButtonProps['color'];
    }
}

export type SchemaFormProps<T = any, F = SchemaFormContext> = Omit<FormProps<T, F>, 'validator'> & {
    validator?: FormProps['validator'];
};

export const FORM_CONTEXT: SchemaFormContext = {
    FormControlProps: {
        size: 'medium',
        variant: 'outlined'
    },
    ButtonProps: {
        size: 'medium',
        variant: 'outlined'
    }
}

const StyledForm = styled('form')(({ theme }) => ({
    display: 'grid',
    gap: theme.spacing(2)
}))

export function SchemaForm(props: SchemaFormProps) {
    return (
        <MonacoEditorThemeProvider>
            <Form
                tagName={StyledForm}
                showErrorList={ false }
                liveValidate={true}
                validator={ validator }
                {...props}
                formContext={{
                    ...FORM_CONTEXT,
                    ...props.formContext
                }}
                templates={{
                    ...TEMPLATES,
                    ...props.templates,
                }}
                widgets={{
                    ...WIDGETS,
                    ...props.widgets
                }}
            >
                <></>
            </Form>
        </MonacoEditorThemeProvider>
    );
}

export default SchemaForm;
