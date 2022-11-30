import {startTransition, useMemo} from "react";
import {v4 as uuid} from 'uuid';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {TextFieldProps} from "@mui/material";
import {Circle} from "@mui/icons-material";

export type ColorFieldProps = TextFieldProps;

export function ColorField(props: ColorFieldProps) {
    const pickerId = useMemo(uuid, []);
    const value = String(props?.value);
    const hasValue = Boolean(props?.value);

    const handleChange: ColorFieldProps['onChange'] = (event) => {
        startTransition(() => {
            props?.onChange?.(event);
        })
    }

    const pickerButton = (
        <>
            <IconButton
                edge="end"
                component="label"
                htmlFor={pickerId}
            >
                <Circle sx={{color: value}} />
            </IconButton>
            <input
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    right: 0,
                    opacity: 0,
                    width: 235,
                    height: '100%',
                    zIndex: -1
                }}
                id={pickerId}
                type="color"
                value={value}
                onChange={handleChange}
            />
        </>
    )

    return (
        <TextField
            {...props}
            InputProps={{
                ...props?.InputProps,
                endAdornment: pickerButton,
            }}
            InputLabelProps={{
                shrink: hasValue
            }}
        />
    )
}

export default ColorField;
