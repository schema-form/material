import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextFieldProps, useTheme
} from "@mui/material";
import {FileUpload} from "@mui/icons-material";
import React from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

export type UploadProps = HTMLInputProps & {
    required?: TextFieldProps['required'];
    disabled?: TextFieldProps['disabled'];
    hidden?: TextFieldProps['hidden'];
    error?: TextFieldProps['error']
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
};

export function Upload(props: UploadProps) {
    const { error, label, helperText, ...inputProps } = props;
    const theme = useTheme();
    const id = props.id || uuid();
    const hasHelperText = Boolean(props.helperText);

    const helper = hasHelperText ? (
        <Typography
            component="p"
            variant="body2"
            color={error ? 'error' : 'textSecondary'}
        >
            {props.helperText}
        </Typography>
    ) : null;

    return (
        <ListItemButton
            component="label"
            htmlFor={id}
            disabled={props.disabled}
            hidden={props.hidden}
            style={{
                borderRadius: theme.shape.borderRadius,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: props.disabled
                    ? theme.palette.grey["300"]
                    : theme.palette.grey["400"],
                paddingTop: theme.spacing(.5),
                paddingBottom: theme.spacing(.5),
            }}
        >
            <ListItemIcon sx={{minWidth: 40}}>
                <FileUpload />
            </ListItemIcon>
            <ListItemText
                primary={props.label}
                secondary={helper}
            />
            <input
                {...inputProps}
                id={id}
                hidden={true}
                type="file"
            />
        </ListItemButton>
    )
}

export default Upload;
