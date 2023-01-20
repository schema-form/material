import {styled} from "@mui/material";
import {FieldTemplateProps, getTemplate, getUiOptions} from "@rjsf/utils";
import {SchemaFormContext} from "../SchemaForm";
import {useConfig} from "../providers/ConfigProvider";
import {FormHeader} from "../components/FormHeader";
import ErrorBoundary from "../components/ErrorBoundary";

const Root = styled('div')(({ theme }) => ({
    display: 'grid',
    width: '100%',
    gridGap: theme.spacing(2),
    '.form-group + .form-group': {
      marginTop: 16
    }
}))

export function FieldTemplateHeader(props: FieldTemplateProps<any, any, SchemaFormContext>) {
    const { rawErrors, label, hidden, disabled, rawDescription } = props;
    const { canDisplayHeader, displayErrorList } = useConfig();
    const hasLabel = Boolean(label);
    const hasDescription = Boolean(rawDescription);
    const hasErrors = Boolean(rawErrors?.length);
    const needDisplayHeader = canDisplayHeader && (hasLabel || hasDescription || hasErrors);

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

const isObject = (props: FieldTemplateProps) => props?.classNames?.match(/(field-object)/);

export function FieldTemplate(props: FieldTemplateProps<any, any, SchemaFormContext>) {
    const { children, schema, registry, uiSchema } = props;
    const uiOptions = getUiOptions(uiSchema);
    const WrapIfAdditionalTemplate = getTemplate<"WrapIfAdditionalTemplate">("WrapIfAdditionalTemplate", registry, uiOptions);

    const { canDisplayHeader, displayErrorList } = useConfig();
    const { rawErrors, label, hidden, disabled, rawDescription } = props;
    const hasLabel = Boolean(label);
    const hasDescription = Boolean(rawDescription);
    const hasErrors = Boolean(rawErrors?.length);
    const hasHeaderEntities = hasLabel || hasDescription || hasErrors;
    const displayHeader = canDisplayHeader && hasHeaderEntities && isObject(props);
    const hasHeaderClassName = displayHeader ? 'has-header' : '';
    const classNames = [props?.classNames, hasHeaderClassName].join(' ').trim();

    const header = displayHeader ? (
      <FormHeader
        className="field-header"
        hidden={hidden}
        label={label}
        helperText={rawDescription}
        disabled={disabled}
        errorMessages={displayErrorList ? rawErrors : undefined}
      />
    ) : null;

    return (
        <ErrorBoundary>
          <WrapIfAdditionalTemplate
            classNames={classNames}
            disabled={props?.disabled}
            id={props?.id}
            label={props?.label}
            onDropPropertyClick={props?.onDropPropertyClick}
            onKeyChange={props?.onKeyChange}
            readonly={props?.readonly}
            required={props?.required}
            schema={schema}
            uiSchema={uiSchema}
            registry={registry}
          >
            <Root>
                {header}
                {children}
            </Root>
          </WrapIfAdditionalTemplate>
        </ErrorBoundary>
    )
}

export default FieldTemplate;
