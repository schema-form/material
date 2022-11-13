import {ArrayFieldDescriptionProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";
import React from "react";

export function ArrayFieldDescriptionTemplate(props: ArrayFieldDescriptionProps) {
    return (
        <Typography
            variant="body1"
            component="p"
            color="textSecondary"
        >
            {props.description || props.schema.description}
        </Typography>
    );
}

export default ArrayFieldDescriptionTemplate;
