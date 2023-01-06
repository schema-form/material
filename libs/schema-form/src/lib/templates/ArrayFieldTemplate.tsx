import React from "react";
import {ArrayFieldTemplateItemType, ArrayFieldTemplateProps} from "@rjsf/utils";
import {Button, styled} from "@mui/material";
import {JSONSchema7} from "json-schema";
import {ConfigProvider, useConfig} from "../providers/ConfigProvider";
import FormCard from "../components/FormCard";
import AddIcon from "@mui/icons-material/Add";

const ItemsList = styled('ul')(({ theme }) => ({
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

    const renderItem = (props: ArrayFieldTemplateItemType) => (
        <ArrayFieldItemTemplate {...props} />
    );

    const body = hasItems ? (
        <ItemsList className="array-items">
            {items.map(renderItem)}
        </ItemsList>
    ) : null;

    return (
        <ConfigProvider value={{
            ...config,
            displayHeader: true
        }}>
            <FormCard
                className={className}
                title={title}
                helperText={error ?? description}
                error={hasError}
                disabled={disabled}
                actions={addButton}
            >
                {body}
            </FormCard>
        </ConfigProvider>
    );
}

export default ArrayFieldTemplate;
