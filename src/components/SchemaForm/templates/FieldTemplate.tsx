import React from 'react';
import {isObject} from "../utils/jsonSchema";
import ErrorList from "../components/ErrorList";
import {styled} from "@mui/material";
import {FieldTemplateProps} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {useConfig} from "../providers/ConfigProvider";
import {FormHeader} from "../components/FormHeader";

const Root = styled('div')(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridGap: theme.spacing(2)
}))

export function FieldTemplateHeader(props: FieldTemplateProps<any, SchemaFormContext>) {
    const { rawErrors, label, hidden, disabled, rawDescription } = props;
    const { displayHeader, displayErrorList } = useConfig();
    const error = displayErrorList
        ? rawErrors?.[0]
        : null;
    const hasError = displayErrorList
        ? Boolean(rawErrors?.length)
        : false;
    const hasLabel = Boolean(label);
    const hasDescription = Boolean(rawDescription);
    const heedDisplayHeader = displayHeader && (hasLabel || hasDescription);

    return heedDisplayHeader && (
        <FormHeader
            hidden={hidden}
            label={label}
            helperText={error || rawDescription}
            error={hasError}
            disabled={disabled}
        />
    );
}

export function FieldErrorList(props: FieldTemplateProps<any, SchemaFormContext>) {
    const { rawErrors } = props;
    const hasErrors = Boolean(rawErrors?.length);
    const { displayErrorList } = useConfig();

    return (displayErrorList && hasErrors) && (
        <ErrorList
            className="field-error-list"
            errors={rawErrors as string[]}
        />
    )
}

export function FieldTemplate(props: FieldTemplateProps<any, SchemaFormContext>) {
    const { children, schema, classNames } = props;
    const isObjectSchema = isObject(schema);
    const header = isObjectSchema
        ? FieldTemplateHeader(props)
        : null;
    const hasHeaderWithError = Boolean(header);
    const needDisplayErrorList = !hasHeaderWithError && isObjectSchema;
    const errorList = needDisplayErrorList
        ? FieldErrorList(props)
        : null;

    return (
        <Root className={classNames}>
            {header}
            {errorList}
            {children}
        </Root>
    )
}

export default FieldTemplate;
