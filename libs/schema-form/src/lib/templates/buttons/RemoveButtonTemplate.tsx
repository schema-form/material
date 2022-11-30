import {IconButtonProps} from "@rjsf/utils";
import {IconButton} from "@mui/material";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

export function RemoveButtonTemplate(props: IconButtonProps) {
    return (
        <IconButton
            color="error"
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <DeleteOutlinedIcon />
        </IconButton>
    );
}

export default RemoveButtonTemplate;
