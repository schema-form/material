import React, {ChangeEventHandler} from "react";
import {
  Button, CardActions, ListItemButton,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText, Stack,
  TextFieldProps, Tooltip
} from "@mui/material";
import {
  AddOutlined,
  AttachmentOutlined, ClearOutlined,
  DeleteOutlineOutlined,
  FileUpload,
  InsertDriveFileOutlined,
} from "@mui/icons-material";
import {v4 as uuid} from "uuid";
import IconButton, {IconButtonProps} from "@mui/material/IconButton";
import FormCard from "./FormCard";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Typography from "@mui/material/Typography";
import {declension} from "../utils/declension";

type HTMLInputProps = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type DataURLFiles = string[];

export type UploadProps = Omit<HTMLInputProps, 'onChange' | 'value'> & {
    required?: TextFieldProps['required'];
    disabled?: TextFieldProps['disabled'];
    hidden?: TextFieldProps['hidden'];
    error?: TextFieldProps['error']
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    value?: string | string[];
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
                <InsertDriveFileOutlined fontSize="small" />
            </ListItemIcon>
            <ListItemText
                primary={file?.name}
                primaryTypographyProps={{
                  style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
            />
            <ListItemSecondaryAction>
                <IconButton color="error" size="small" onClick={onRemove}>
                    <DeleteOutlineOutlined fontSize="small" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const CLEAR_TEXT = 'Отменить выбор';
const MULTIPLE_CLEAR_LABEL = 'Удалить все';
const DEFAULT_LABEL = 'Выберите файл';
const DEFAULT_MULTIPLE_LABEL = 'Добавить файлы';
const DEFAULT_HELPER_TEXT = 'Файл не выбран';

function SingleUpload(props: UploadProps) {
  const { error, ...inputProps } = props;
  const value = props.value as string | undefined;
  const id = props.id || uuid();
  const fileName = value
    ? value?.match(/name=(.+?);/)?.[1] || 'Файл без имени'
    : undefined;
  const isSelected = Boolean(value);
  const label = props.label || DEFAULT_LABEL;
  const helperText = isSelected
    ? fileName
    : (props?.helperText || DEFAULT_HELPER_TEXT);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (props.onChange) {
      const file = event.target?.files?.item(0);
      const fileAsDataURL = file
        ? await toDataURL(file)
        : undefined;

      props.onChange(fileAsDataURL ? [fileAsDataURL] : []);
    }
  }

  const handleClear = () => props.onChange?.([]);

  const fileInput = (
    <input
      {...inputProps}
      id={id}
      hidden={true}
      type="file"
      value={undefined}
      multiple={false}
      onChange={handleChange}
    />
  );

  const selectButton = (
    <Tooltip title={DEFAULT_LABEL} placement="left">
      <IconButton
        component="label"
        htmlFor={id}
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        size="small"
      >
        <FileUpload />
      </IconButton>
    </Tooltip>
  );

  const clearButton = isSelected && (
    <Tooltip title={CLEAR_TEXT} placement="left">
      <IconButton
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        onClick={handleClear}
        size="small"
      >
        <ClearOutlined />
      </IconButton>
    </Tooltip>
  );

  const secondaryActions = (
    <Stack direction="row" alignItems="center" spacing={.5}>
      {clearButton}
      {selectButton}
    </Stack>
  )

  const primaryText = label ? (
    <Typography
      component="span"
      variant="body1"
      color={error ? 'error' : 'textPrimary'}
    >
      {label}
    </Typography>
  ) : null;

  const secondaryText = helperText ? (
    <Typography
      component="p"
      variant="caption"
      color={error ? 'error' : 'textSecondary'}
    >
      {helperText}
    </Typography>
  ) : null;

  const listItem = (
    <ListItem
      disablePadding
      secondaryAction={secondaryActions}
    >
      <ListItemButton
        component="label"
        htmlFor={id}
        disabled={props.disabled}
        sx={{py: helperText ? .5 : .75}}
      >
        <ListItemIcon>
          <AttachmentOutlined color={error ? 'error' : undefined} />
        </ListItemIcon>
        <ListItemText
          primary={primaryText}
          secondary={secondaryText}
        />
      </ListItemButton>
    </ListItem>
  )

  return (
    <FormCard
      error={error}
      disabled={props.disabled}
      isControl={true}
      sx={{borderStyle: 'dashed'}}
    >
      {listItem}
      {fileInput}
    </FormCard>
  )
}

const createSelectedFilesMessage = (filesCount?: number) => {
  if (filesCount) {
    const chooseWord = declension('Выбран', 'Выбрано', 'Выбрано', filesCount);
    const filesWord = declension('файл', 'файлов', 'файла', filesCount);
    return `${chooseWord} ${filesCount} ${filesWord}`;
  }

  return 'Файлы не выбраны';
}

function MultipleUpload(props: UploadProps) {
  const {error, ...inputProps} = props;
  const id = props.id || uuid();
  const value = props.value as string[] | undefined;
  const filesAsDataURLs = value?.filter?.(Boolean);
  const selectedFilesCount = filesAsDataURLs?.length;
  const hasFiles = Boolean(selectedFilesCount);
  const selectedMessage = createSelectedFilesMessage(selectedFilesCount);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (props.onChange) {
      const fileList = event.target?.files || [];
      const fileListAsDataURLs = value instanceof Array ? value : [];

      for (let index = 0; index < fileList.length; index++) {
        const file = event.target?.files?.item(index);

        if (file) {
          const fileAsDataURL = await toDataURL(file);
          fileListAsDataURLs.push(fileAsDataURL);
        }
      }

      props.onChange(fileListAsDataURLs);
    }
  }

  const handleClear = () => props.onChange?.([]);

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

  const selectIconButton = (
    <Tooltip title={DEFAULT_MULTIPLE_LABEL}>
      <IconButton
        component="label"
        htmlFor={id}
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        size="small"
      >
        <FileUpload/>
      </IconButton>
    </Tooltip>
  );

  const clearIconButton = hasFiles && (
    <Tooltip title={CLEAR_TEXT}>
      <IconButton
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        onClick={handleClear}
        size="small"
      >
        <ClearOutlined/>
      </IconButton>
    </Tooltip>
  );

  const headerActions = (
    <Stack direction="row" alignItems="center" spacing={.5}>
      {clearIconButton}
      {selectIconButton}
    </Stack>
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

  const addButton = (
    <Button
      component="label"
      htmlFor={id}
      disabled={props.disabled}
      color={error ? 'error' : undefined}
      startIcon={<AddOutlined/>}
    >
      {DEFAULT_MULTIPLE_LABEL}
    </Button>
  );

  const clearButton = hasFiles && (
    <Button
      disabled={props.disabled}
      color="error"
      startIcon={<ClearOutlined/>}
      onClick={handleClear}
    >
      {MULTIPLE_CLEAR_LABEL}
    </Button>
  );

  const cardActions = (
    <CardActions sx={{justifyContent: 'space-between'}}>
      {addButton}
      {clearButton}
    </CardActions>
  );

  const formCard = (
    <FormCard
      title={props.label}
      subheader={selectedMessage}
      helperText={props.helperText}
      icon={<AttachmentOutlined/>}
      error={error}
      disabled={props.disabled}
      notExpandedActions={headerActions}
      defaultExpanded={false}
      isControl={true}
      sx={{borderStyle: 'dashed'}}
    >
      {fileList}
      {cardActions}
    </FormCard>
  )

  return (
    <>
      {formCard}
      {fileInput}
    </>
  );
}

export function Upload(props: UploadProps) {
  const isMultiple = Boolean(props?.multiple);

  return isMultiple ? (
    <MultipleUpload {...props} />
  ) : (
    <SingleUpload {...props} />
  )
}

export default Upload;
