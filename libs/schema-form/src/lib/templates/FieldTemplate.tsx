import {isObject} from "../utils/jsonSchema";
import ErrorList from "../components/ErrorList";
import {styled} from "@mui/material";
import {FieldTemplateProps} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {useConfig} from "../providers/ConfigProvider";
import {FormHeader} from "../components/FormHeader";
import ErrorBoundary from "../components/ErrorBoundary";

const Root = styled('div')(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridGap: theme.spacing(2),
    '.form-group + &.form-group': {
      marginTop: 16
    }
}))

export function FieldTemplateHeader(props: FieldTemplateProps<any, any, SchemaFormContext>) {
    const { rawErrors, label, hidden, disabled, rawDescription } = props;
    const { displayHeader, displayErrorList } = useConfig();
    const hasLabel = Boolean(label);
    const hasDescription = Boolean(rawDescription);
    const needDisplayHeader = displayHeader && (hasLabel || hasDescription);

    return needDisplayHeader ? (
        <FormHeader
            hidden={hidden}
            label={label}
            helperText={rawDescription}
            disabled={disabled}
            errorMessages={displayErrorList ? rawErrors : undefined}
        />
    ) : null;
}

export function FieldErrorList(props: FieldTemplateProps<any, any, SchemaFormContext>) {
    const { rawErrors } = props;
    const hasErrors = Boolean(rawErrors?.length);
    const { displayErrorList } = useConfig();
    const hasErrorList = displayErrorList && hasErrors;

    return hasErrorList ? (
        <ErrorList
            className="field-error-list"
            errors={rawErrors as string[]}
        />
    ) : null;
}

export function FieldTemplate(props: FieldTemplateProps<any, any, SchemaFormContext>) {
    const { children, schema, classNames } = props;
    const isObjectSchema = isObject(schema);
    const header = isObjectSchema
        ? FieldTemplateHeader(props)
        : null;

    return (
        <ErrorBoundary>
            <Root className={classNames}>
                {header}
                {children}
            </Root>
        </ErrorBoundary>
    )
}

export default FieldTemplate;
