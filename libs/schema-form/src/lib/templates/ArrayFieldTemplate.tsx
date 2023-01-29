import React from "react";
import {ArrayFieldTemplateItemType, ArrayFieldTemplateProps} from "@rjsf/utils";
import {Button, styled} from "@mui/material";
import {JSONSchema7} from "json-schema";
import {ConfigProvider, useConfig} from "../providers/ConfigProvider";
import FormCard from "../components/FormCard";
import AddIcon from "@mui/icons-material/Add";
import {UiSchema} from "../SchemaForm";
import {isGroup} from "../utils/jsonSchema";
import {ArrayFieldControlItemTemplate, ArrayFieldGroupItemTemplate} from "./ArrayFieldItemTemplate";

const ItemsGrid = styled('ul')(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: 'repeat(12,1fr)',
    listStyle: 'none',
    padding: 0,
    margin: 0,
}))

const ItemsGridItem = styled('li')(({ theme }) => ({
  listStyle: 'none',
  padding: 0,
  margin: 0,
}))

export function ArrayFieldTemplate(props: ArrayFieldTemplateProps) {
    const { className, items, registry, title, disabled, rawErrors, schema, canAdd, onAddClick } = props;
    const { description } = schema || {};
    const { ArrayFieldItemTemplate } = registry.templates || {};
    const config = useConfig();
    const error = rawErrors?.[0];
    const itemsCount = items.length;
    const hasItems = Boolean(itemsCount);
    const hasError = Boolean(error);
    const itemLabel =
        (schema?.items as JSONSchema7)?.title ||
        (schema?.additionalItems as JSONSchema7)?.title ||
        'New';

    const addButton = (
        <Button
            disabled={!canAdd}
            startIcon={<AddIcon />}
            onClick={onAddClick}
            color={hasError ? 'error' : 'primary'}
        >
            {itemLabel}
        </Button>
    );

    const renderItem = (props: ArrayFieldTemplateItemType) => {
      const uiSchema = props?.uiSchema as UiSchema;
      const gridColumn = uiSchema?.['ui:gridColumn'] ?? '1 / 13';
      const childrenSchema = props?.children?.props?.schema || {};
      const isGroupSchema = isGroup(childrenSchema);
      const arrayItemField = isGroupSchema
        ? ArrayFieldGroupItemTemplate(props)
        : ArrayFieldControlItemTemplate(props);

      return (
        <ItemsGridItem
          style={{ gridColumn }}
          sx={isGroupSchema ? undefined : { p: 2, '& + &': { pt: 0 } }}
        >
          {arrayItemField}
        </ItemsGridItem>
      );
    }

    const body = hasItems ? (
        <ItemsGrid className="array-items">
            {items.map(renderItem)}
        </ItemsGrid>
    ) : null;

    return (
        <ConfigProvider value={{
            ...config,
            canDisplayHeader: true
        }}>
            <FormCard
                className={className}
                title={title}
                helperText={error ?? description}
                error={hasError}
                disabled={disabled}
                footerActions={addButton}
            >
                {body}
            </FormCard>
        </ConfigProvider>
    );
}

export default ArrayFieldTemplate;
