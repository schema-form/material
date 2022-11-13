import {IconButtonProps} from "@rjsf/utils";
import {Button} from "@mui/material";

export function SubmitButtonTemplate(props: IconButtonProps) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="medium"
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            Submit
        </Button>
    );
}

export default SubmitButtonTemplate;
