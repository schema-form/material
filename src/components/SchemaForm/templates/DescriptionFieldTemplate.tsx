import {DescriptionFieldProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";
import React from "react";

export function DescriptionFieldTemplate(props: DescriptionFieldProps) {
    return (
        <Typography
            id={props.id}
            variant="body1"
            component="p"
            color="textSecondary"
        >
            {props.description || props.schema.description}
        </Typography>
    );
}

export default DescriptionFieldTemplate;
