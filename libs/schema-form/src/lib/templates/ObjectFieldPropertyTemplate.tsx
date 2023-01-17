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

    return (
        <ListItem
            key={name}
            className="object-property"
        >
            <FormControlReorder
                control={content}
                size="medium"
                variant="outlined"
            />
        </ListItem>
    );
}

export default ObjectFieldPropertyTemplate;
