import React from "react";
import {IconButtonProps} from "@rjsf/utils";
import {IconButton} from "@mui/material";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

export function MoveDownButtonTemplate(props: IconButtonProps) {
    return (
        <IconButton
            className={props.className}
            disabled={props.disabled}
            onClick={props.onClick}
        >
            <KeyboardArrowDownIcon />
        </IconButton>
    );
}

export default MoveDownButtonTemplate;
