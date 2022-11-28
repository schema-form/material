import React, {useEffect, useState} from "react";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {TextField, TextFieldProps, Tooltip} from "@mui/material";

export type PasswordFieldProps = TextFieldProps & {
    showPassword?: boolean;
};

export function PasswordField(props: PasswordFieldProps) {
    const { showPassword: defaultShowPassword } = props;
    const [showPassword, setShowPassword] = useState(defaultShowPassword);
    const type = showPassword ? 'text' : 'password';
    const toggleShowPassword = () => setShowPassword(!showPassword);

    useEffect(() => {
        setShowPassword(defaultShowPassword);
    }, [defaultShowPassword])

    const iconButton = (
        <Tooltip
            title={showPassword ? 'Hide password' : 'Show password'}
            placement='left'
        >
            <IconButton
                edge="end"
                size={props.size}
                onClick={toggleShowPassword}
            >
                {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
        </Tooltip>
    )

    return (
        <TextField
            {...props}
            type={type}
            InputProps={{
                ...props?.InputProps,
                endAdornment: iconButton
            }}
        />
    )
}

export default PasswordField;
