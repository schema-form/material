import {IconButtonProps} from "@rjsf/utils";
import {IconButton} from "@mui/material";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

export function MoveUpButtonTemplate(props: IconButtonProps) {
    return (
        <IconButton
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <KeyboardArrowUpIcon />
        </IconButton>
    );
}

export default MoveUpButtonTemplate;
