import {ArrayFieldTitleProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";

export function ArrayFieldTitleTemplate(props: ArrayFieldTitleProps) {
    return (
        <Typography component="legend" variant="h6" p={0}>
            {props.title}
        </Typography>
    );
}

export default ArrayFieldTitleTemplate;
