import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    TextFieldProps, useTheme
} from "@mui/material";
import {FileUpload} from "@mui/icons-material";
import React, {ChangeEvent} from "react";
import {v4 as uuid} from "uuid";
import Typography from "@mui/material/Typography";

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type UploadValue = {
    files?: FileList;
    filesAsDataURLs?: string[];
}

export type UploadProps = Omit<HTMLInputProps, 'onChange'> & {
    required?: TextFieldProps['required'];
    disabled?: TextFieldProps['disabled'];
    hidden?: TextFieldProps['hidden'];
    error?: TextFieldProps['error']
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    onChange?: (event: ChangeEvent<HTMLInputElement>, value: UploadValue) => void;
};

const toDataURL = (file: File): Promise<string> => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
        const content = (reader.result as string)?.replace(/(data:.*?;)/, `$1name=${file.name};lastModified=${file.lastModified};`);
        resolve(content);
    }
    reader.onerror = reject;
});

const fromDataURL = (dataURLString: string): File => {
    const blob = new Blob([dataURLString]);
    const [, originName] = dataURLString?.match(/;name=(.*?);/) || [];
    const [, lastModified] = dataURLString?.match(/;lastModified=(.*?);/) || [];
    const fileName = originName || uuid();
    return new File([blob], fileName, {
        lastModified: lastModified
            ? Number(lastModified)
            : undefined
    });
}

export function Upload(props: UploadProps) {
    const { error, value: originValue, ...inputProps } = props;
    const theme = useTheme();
    const id = props.id || uuid();

    const label = props.label ? (
        <Typography
            component="span"
            variant="body2"
            color={error ? 'error' : 'textPrimary'}
        >
            {props.label}
        </Typography>
    ) : null;

    const helperText = props.helperText ? (
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
                    : theme.palette.grey["400"]
            }}
        >
            <ListItemIcon>
                <FileUpload />
            </ListItemIcon>
            <ListItemText
                primary={label}
                secondary={helperText}
            />
            <input
                {...inputProps}
                id={id}
                hidden={true}
                type="file"
                value={undefined}
                onChange={async (event) => {
                    if (props.onChange) {
                        const fileList = event.target?.files || [];
                        const fileListAsDataURLs = [];

                        for (let index = 0; index < fileList.length; index++) {
                            const file = event.target?.files?.item(index);

                            if (file) {
                                fileListAsDataURLs[index] = await toDataURL(file);
                            }
                        }

                        props.onChange(event, {
                            files: event.target?.files || undefined,
                            filesAsDataURLs: fileListAsDataURLs
                        });
                    }
                }}
            />
        </ListItemButton>
    )
}

export default Upload;
