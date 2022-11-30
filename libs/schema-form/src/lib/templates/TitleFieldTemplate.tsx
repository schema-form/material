import {TitleFieldProps} from "@rjsf/utils";
import Typography from "@mui/material/Typography";

export function TitleFieldTemplate(props: TitleFieldProps) {
    return (
        <Typography component="legend" variant="h6" id={props.id} p={0}>
            {props.title}
        </Typography>
    );
}

export default TitleFieldTemplate;
