import React from 'react';
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

export function ObjectFieldTemplate(props: ObjectFieldTemplateProps<any, SchemaFormContext>) {
    const { properties, schema, onAddClick, registry } = props;
    const { AddButton } = registry.templates.ButtonTemplates;
    const config = useConfig();
    const propertyLimitExceeded = properties.length >= (schema.maxProperties || Number.MAX_SAFE_INTEGER);
    const hasAddButton = schema.additionalProperties && !propertyLimitExceeded;
    const items = properties?.map(ObjectFieldPropertyTemplate);
    const hasItems = Boolean(items?.length);

    const propertyList = hasItems && (
        <PropertyList className="object-field__properties">
            {items}
        </PropertyList>
    );

    const addButton = hasAddButton && (
        <AddButton
            onClick={onAddClick(schema)}
        >
            Add property
        </AddButton>
    );

    const footer = hasAddButton && (
        <footer className="object-field__footer">
            {addButton}
        </footer>
    );

    return (
        <ConfigProvider value={{
            ...config,
            displayHeader: true
        }}>
            <Root className="object-field">
                {propertyList}
                {footer}
            </Root>
        </ConfigProvider>
    )
}

export default ObjectFieldTemplate;
