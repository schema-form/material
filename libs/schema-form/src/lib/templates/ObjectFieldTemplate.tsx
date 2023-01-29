import {ObjectFieldTemplatePropertyType, ObjectFieldTemplateProps} from "@rjsf/utils";
import {styled} from "@mui/material";
import {UiSchema, SchemaFormContext} from "../SchemaForm";
import {ConfigProvider, useConfig} from '../providers/ConfigProvider';
import FormControlReorder from "../components/FormControlReorder";
import React from "react";

const Root = styled('fieldset')(({ theme }) => ({
    display: 'grid',
    gridGap: theme.spacing(2),
    width: '100%',
    padding: 0,
    margin: 0,
    border: 'none'
}))

const PropertyGrid = styled('ul')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(12,1fr)',
    gridGap: theme.spacing(2),
    width: '100%',
    padding: 0,
    margin: 0
}))

const PropertyGridItem = styled('li')(({ theme }) => ({
  listStyle: 'none',
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

    const renderProperty = (property: ObjectFieldTemplatePropertyType) => {
      const uiSchema = property?.content?.props?.uiSchema as UiSchema;
      const gridColumn = uiSchema?.['ui:gridColumn'] ?? '1 / 13';
      return (
        <PropertyGridItem
          key={property?.name}
          className="object-field__property"
          style={{ gridColumn }}
        >
          <FormControlReorder
            control={property?.content}
            size="medium"
            variant="outlined"
          />
        </PropertyGridItem>
      );
    }

    const propertyGrid = hasProperties ? (
        <PropertyGrid className="object-field__properties">
            {properties?.map(renderProperty)}
        </PropertyGrid>
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
                {propertyGrid}
                {footer}
            </Root>
        </ConfigProvider>
    )
}

export default ObjectFieldTemplate;
