import React from "react";
import {ArrayFieldDescriptionProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";

export function ArrayFieldDescriptionTemplate(props: ArrayFieldDescriptionProps) {
    const description = props.description || props.schema.description;
    const hasDescription = Boolean(description);

    return hasDescription ? (
        <Typography
            variant="body1"
            component="p"
            color="textSecondary"
        >
            {description}
        </Typography>
    ) : null;
}

export default ArrayFieldDescriptionTemplate;
