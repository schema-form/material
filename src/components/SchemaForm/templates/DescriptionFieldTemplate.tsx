import {DescriptionFieldProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";
import React from "react";

export function DescriptionFieldTemplate(props: DescriptionFieldProps) {
    const description = props.description || props.schema.description;
    const hasDescription = Boolean(description);

    return hasDescription ? (
        <Typography
            id={props.id}
            variant="body1"
            component="p"
            color="textSecondary"
        >
            {description}
        </Typography>
    ) : null;
}

export default DescriptionFieldTemplate;
