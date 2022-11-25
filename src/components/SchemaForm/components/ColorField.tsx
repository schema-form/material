import React, {startTransition, useMemo} from "react";
import {v4 as uuid} from 'uuid';
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {TextFieldProps} from "@mui/material";
import PaletteIcon from '@mui/icons-material/Palette';

export type ColorFieldProps = TextFieldProps;

export function ColorField(props: ColorFieldProps) {
    const pickerId = useMemo(uuid, []);
    const color = String(props?.value);
    const iconColor = color || 'rgba(0,0,0,.05)';

    const handleChange: ColorFieldProps['onChange'] = (event) => {
        startTransition(() => {
            props?.onChange?.(event);
        })
    }

    const pickerButton = (
        <React.Fragment>
            <IconButton
                edge="end"
                component="label"
                htmlFor={pickerId}
            >
                <PaletteIcon
                    sx={{color: iconColor}}
                />
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
                    zIndex: -1,
                    background: 'red'
                }}
                id={pickerId}
                type="color"
                value={color}
                onChange={handleChange}
            />
        </React.Fragment>
    )

    return (
        <TextField
            {...props}
            InputProps={{
                ...props?.InputProps,
                endAdornment: pickerButton
            }}
        />
    )
}

export default ColorField;
