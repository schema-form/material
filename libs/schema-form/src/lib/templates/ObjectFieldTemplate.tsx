import {ObjectFieldTemplateProps} from "@rjsf/utils";
import {styled} from "@mui/material";
import ObjectFieldPropertyTemplate from "./ObjectFieldPropertyTemplate";
import {SchemaFormContext} from "../SchemaForm";
import {ConfigProvider, useConfig} from '../providers/ConfigProvider';

const Root = styled('fieldset')(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(2),
    width: '100%',
    padding: 0,
    margin: 0,
    border: 'none'
}))

const PropertyList = styled('ul')(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(2),
    width: '100%',
    padding: 0,
    margin: 0
}))

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps<any, any, SchemaFormContext>) {
    const { properties, schema, onAddClick, registry } = props;
    const { AddButton } = registry.templates.ButtonTemplates;
    const config = useConfig();
    const propertyLimitExceeded = properties.length >= (schema.maxProperties || Number.MAX_SAFE_INTEGER);
    const hasAddButton = schema.additionalProperties && !propertyLimitExceeded;
    const hasProperties = Boolean(properties?.length);

    const propertyList = hasProperties ? (
        <PropertyList className="object-field__properties">
            {properties?.map(ObjectFieldPropertyTemplate)}
        </PropertyList>
    ) : null;

    const addButton = hasAddButton ? (
        <AddButton
            onClick={onAddClick(schema)}
        >
            New property
        </AddButton>
    ) : null;

    const footer = hasAddButton ? (
        <footer className="object-field__footer">
            {addButton}
        </footer>
    ) : null;

    return (
        <ConfigProvider value={{
            ...config,
            canDisplayHeader: true,
            props
        }}>
            <Root className="object-field">
                {propertyList}
                {footer}
            </Root>
        </ConfigProvider>
    )
}

export default ObjectFieldTemplate;
