import {ObjectFieldTemplatePropertyType} from "@rjsf/utils";
import FormReorder from "../components/FormReorder";
import React from "react";
import {styled} from "@mui/material";

const ListItem = styled('li')(({ theme }) => ({
    listStyle: 'none',
    padding: 0,
    margin: 0
}))

export function ObjectFieldPropertyTemplate(property: ObjectFieldTemplatePropertyType) {
    const { name, content } = property || {};
    const { onDropPropertyClick, schema } = content?.props || {};
    const { __additional_property: isAdditional } = schema || {};

    const onRemove = isAdditional
        ? onDropPropertyClick(property.name)
        : undefined;

    return (
        <ListItem
            key={name}
            className="object-property"
        >
            <FormReorder
                onRemove={onRemove}
                children={content}
                size="medium"
                variant="outlined"
            />
        </ListItem>
    );
}

export default ObjectFieldPropertyTemplate;
