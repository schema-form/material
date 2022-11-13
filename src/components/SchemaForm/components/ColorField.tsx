import React, {useMemo} from "react";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import {TextFieldProps} from "@mui/material";
import MaskedInput from "react-text-mask";

export type ColorFieldProps = TextFieldProps;

const generateId = () => Math.random().toString(16).substring(2);

function MaskedInputColor(props: any) {
    const { inputRef, ...otherProps } = props;

    return (
        <MaskedInput
            {...otherProps}
            ref={(ref: any) => {
                inputRef(ref ? ref.inputElement : null);
            }}
            mask={['#', /[0-9A-Fa-f]/, /[0-9A-Fa-f]/, /[0-9A-Fa-f]/, /[0-9A-Fa-f]/, /[0-9A-Fa-f]/, /[0-9A-Fa-f]/]}
            placeholderChar={'\u2000'}
            showMask
        />
    );
}

export function ColorField(props: ColorFieldProps) {
    const { value, onChange } = props || {};
    const pickerId = useMemo(generateId, []);

    const pickerButton = (
        <IconButton
            style={{ position: 'relative' }}
            component="label"
            htmlFor={pickerId}
        >
            <div
                style={{
                    backgroundColor: String(value) || 'rgba(0,0,0,.05)',
                    width: 24,
                    height: 24,
                    borderRadius: '50%'
                }}
            />
            <input
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: 0,
                    right: 0,
                    width: 24,
                    height: 24,
                    margin: 'auto',
                    borderRadius: '50%',
                    opacity: 0,
                    zIndex: -1
                }}
                id={pickerId}
                type="color"
                value={String(value)}
                onChange={onChange}
            />
        </IconButton>
    )

    return (
        <TextField
            {...props}
            InputProps={{
                ...props?.InputProps,
                endAdornment: pickerButton,
                inputComponent: MaskedInputColor
            }}
        />
    )
}

export default ColorField;
