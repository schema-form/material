import {ChangeEventHandler} from "react";
import {
    Button,
    ListItemIcon, ListItemSecondaryAction,
    ListItemText,
    TextFieldProps
} from "@mui/material";
import {
    DeleteOutlineOutlined,
    FileUpload,
    InsertDriveFileOutlined,
} from "@mui/icons-material";
import {v4 as uuid} from "uuid";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import FormCard from "./FormCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DataURLFiles = string[];

export type UploadProps = Omit<HTMLInputProps, 'onChange' | 'value'> & {
    required?: TextFieldProps['required'];
    disabled?: TextFieldProps['disabled'];
    hidden?: TextFieldProps['hidden'];
    error?: TextFieldProps['error']
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    value?: string[];
    onChange?: (value?: DataURLFiles) => void;
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

type UploadItemProps = {
    file: File;
    onRemove?: IconButtonProps['onClick'];
}

function UploadItem({ file, onRemove }: UploadItemProps) {
    return (
        <ListItem dense={true}>
            <ListItemIcon>
                <InsertDriveFileOutlined />
            </ListItemIcon>
            <ListItemText
                primary={file?.name}
            />
            <ListItemSecondaryAction>
                <IconButton color="error" onClick={onRemove}>
                    <DeleteOutlineOutlined />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

export function Upload(props: UploadProps) {
    const { error, value, ...inputProps } = props;
    const id = props.id || uuid();
    const filesAsDataURLs = value?.filter?.(Boolean);
    const hasFiles = Boolean(filesAsDataURLs?.length);

    const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
        if (props.onChange) {
            const fileList = event.target?.files || [];
            const fileListAsDataURLs = [];

            for (let index = 0; index < fileList.length; index++) {
                const file = event.target?.files?.item(index);

                if (file) {
                    fileListAsDataURLs[index] = await toDataURL(file);
                }
            }

            props.onChange(fileListAsDataURLs);
        }
    }

    const fileInput = (
        <input
            {...inputProps}
            id={id}
            hidden={true}
            type="file"
            value={undefined}
            onChange={handleChange}
        />
    );

    const uploadIconButton = (
        <Button
            component="label"
            htmlFor={id}
            size="small"
            disabled={props.disabled}
            color={error ? 'error' : undefined}
            startIcon={<FileUpload />}
        >
            Выберите файл
        </Button>
    )

    const renderFileItem = (fileDataURL: string, index: number) => {
        const file = fromDataURL(fileDataURL);
        return (
            <UploadItem
                key={index}
                file={file}
                onRemove={() => {
                    const notEqual = (itemFileDataURL: string) => itemFileDataURL !== fileDataURL;
                    const newValue = filesAsDataURLs?.filter(notEqual);
                    props.onChange?.(newValue);
                }}
            />
        )
    }

    const fileList = hasFiles ? (
        <List>
            {filesAsDataURLs?.map(renderFileItem)}
        </List>
    ) : null;

    return (
        <>
            <FormCard
                title={'Файл не выбран'}
                helperText={props.helperText}
                error={error}
                disabled={props.disabled}
                secondaryActions={uploadIconButton}
                defaultExpanded={false}
                isControl={true}
                sx={{borderStyle: 'dashed'}}
            >
                {fileList}
            </FormCard>
            {fileInput}
        </>
    )
}

export default Upload;
