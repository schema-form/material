import React from "react";
import {ObjectFieldTemplatePropertyType} from "@rjsf/utils";
import FormControlReorder from "../components/FormControlReorder";
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
            <FormControlReorder
                onRemove={onRemove}
                control={content}
                size="medium"
                variant="outlined"
            />
        </ListItem>
    );
}

export default ObjectFieldPropertyTemplate;
