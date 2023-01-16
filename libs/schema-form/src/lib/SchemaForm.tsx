import { customizeValidator } from "@rjsf/validator-ajv8";
import Form, { FormProps } from "@rjsf/core";
import {FormControlProps, ButtonProps, styled} from "@mui/material";
import WIDGETS from "./widgets";
import TEMPLATES from "./templates";
import MonacoEditorThemeProvider from "./components/MonacoEditor/MonacoEditorThemeProvider";
import ErrorBoundary from "./components/ErrorBoundary";
import { StrictRJSFSchema } from "@rjsf/utils";
// import localize from 'ajv-i18n/localize/en';
import createTransformErrors from "./utils/createTransformErrors";

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

export type SchemaFormProps<T = any, S extends StrictRJSFSchema = any, F extends SchemaFormContext = any> = Omit<FormProps<T, S, F>, 'validator'> & {
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

const validator = customizeValidator();

export function SchemaForm(props: SchemaFormProps) {
    return (
        <ErrorBoundary>
            <MonacoEditorThemeProvider>
                <Form
                    tagName={StyledForm}
                    showErrorList={ false }
                    liveValidate={true}
                    validator={ validator }
                    transformErrors={(errors) => createTransformErrors(errors, props.schema)}
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
        </ErrorBoundary>
    );
}

export default SchemaForm;
