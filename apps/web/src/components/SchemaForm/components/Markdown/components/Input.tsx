import React, {PropsWithChildren} from "react";
import {Checkbox} from "@mui/material";

export function Input(props: PropsWithChildren<any>) {
    switch (props.type) {
        case 'checkbox': return (
            <Checkbox
                size='small'
                style={{padding: 0}}
                {...props}
            />
        );
        default: return <input {...props} />;
    }
}

export default Input;
