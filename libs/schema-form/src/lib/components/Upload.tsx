import React, {ChangeEventHandler, useMemo, useState} from "react";
import {
  Button, CardActions, ListItemButton,
  ListItemIcon, ListItemSecondaryAction,
  ListItemText, Stack,
  TextFieldProps, Tooltip
} from "@mui/material";
import {
  AddOutlined, AttachmentOutlined,
  ClearOutlined, CloseOutlined, DeleteOutlineOutlined,
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
import CircularProgress from "@mui/material/CircularProgress";

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
    fileDataURL: string;
    isPending?: boolean;
    onRemove?: IconButtonProps['onClick'];
}

const getFileName = (fileAsDataURL: string) => fileAsDataURL?.match(/name=(.+?);/)?.[1] || 'Файл без имени';

function UploadItem({ fileDataURL, isPending, onRemove }: UploadItemProps) {
    const fileName = getFileName(fileDataURL);

    const icon = isPending ? (
      <CircularProgress size={20} />
    ) : (
      <InsertDriveFileOutlined fontSize="small" />
    );

    return (
        <ListItem dense={true}>
            <ListItemIcon>
                {icon}
            </ListItemIcon>
            <ListItemText
                primary={fileName}
                primaryTypographyProps={{
                  style: {
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                  }
                }}
            />
            <ListItemSecondaryAction>
                <IconButton size="small" onClick={onRemove}>
                    <DeleteOutlineOutlined color="error" fontSize="small" />
                </IconButton>
            </ListItemSecondaryAction>
        </ListItem>
    )
}

const CLEAR_TEXT = 'Отменить выбор';
const MULTIPLE_CLEAR_TEXT = 'Отменить выбор';
const DEFAULT_LABEL = 'Выберите файл';
const DEFAULT_MULTIPLE_LABEL = 'Выберите файлы';
const DEFAULT_HELPER_TEXT = 'Файл не выбран';
const DEFAULT_MULTIPLE_HELPER_TEXT = 'Файлы не выбраны';

function SingleUpload(props: UploadProps) {
  const { error, ...inputProps } = props;
  const value = props.value as string | undefined;
  const id = props.id || uuid();
  const fileName = value
    ? getFileName(value)
    : undefined;
  const isSelected = Boolean(value);
  const label = props.label ?? DEFAULT_LABEL;
  const helperText = isSelected
    ? fileName
    : (props?.helperText ?? DEFAULT_HELPER_TEXT);
  const [isPending, setPending] = useState(false);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!props.onChange) return;

    setPending(true);
    const file = event.target?.files?.item(0);
    const fileAsDataURL = file
      ? await toDataURL(file)
      : undefined;

    props.onChange?.(fileAsDataURL ? [fileAsDataURL] : []);
    setPending(false);
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

  const selectIconButton = (
    <Tooltip title={DEFAULT_LABEL} placement="left">
      <IconButton
        component="label"
        htmlFor={id}
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        size="small"
        edge="end"
      >
        <FileUpload />
      </IconButton>
    </Tooltip>
  );

  const clearIconButton = isSelected && (
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
      {clearIconButton}
      {selectIconButton}
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

  const icon = isPending ? (
    <CircularProgress size={24} />
  ) : (
    <AttachmentOutlined color={error ? 'error' : undefined} />
  );

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
          {icon}
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

const createSelectedFilesMessage = (filesCount: number) => {
  const chooseWord = declension('Выбран', 'Выбрано', 'Выбрано', filesCount);
  const filesWord = declension('файл', 'файлов', 'файла', filesCount);
  return `${chooseWord} ${filesCount} ${filesWord}`;
}

function MultipleUpload(props: UploadProps) {
  const [isPending, setPending] = useState(false);
  const id = useMemo(() => props.id || uuid(), [props.id]);
  const {error, ...inputProps} = props;
  const value = props.value as string[] | undefined;
  const filesAsDataURLs = value?.filter?.(Boolean);
  const selectedFilesCount = filesAsDataURLs?.length;
  const hasFiles = Boolean(selectedFilesCount);
  const selectedMessage = selectedFilesCount
    ? createSelectedFilesMessage(selectedFilesCount)
    : (props.helperText ?? DEFAULT_MULTIPLE_HELPER_TEXT);

  const handleChange: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (!props.onChange) return;
    setPending(true);

    const fileList = event.target?.files || [];
    const fileListAsDataURLs = value instanceof Array ? value : [];

    for (let index = 0; index < fileList.length; index++) {
      const file = event.target?.files?.item(index);

      if (!file) continue;

      const fileAsDataURL = await toDataURL(file);
      fileListAsDataURLs.push(fileAsDataURL);
    }

    props.onChange?.(fileListAsDataURLs);
    setPending(false);
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
    <Tooltip title={DEFAULT_MULTIPLE_LABEL} placement="left">
      <IconButton
        component="label"
        htmlFor={id}
        disabled={props.disabled}
        color={error ? 'error' : undefined}
        size="small"
        edge="end"
      >
        <FileUpload />
      </IconButton>
    </Tooltip>
  );

  const clearIconButton = hasFiles && (
    <Tooltip title={MULTIPLE_CLEAR_TEXT} placement="left">
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
    return (
      <UploadItem
        key={index}
        fileDataURL={fileDataURL}
        isPending={false}
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
      startIcon={<CloseOutlined />}
      onClick={handleClear}
    >
      {MULTIPLE_CLEAR_TEXT}
    </Button>
  );

  const cardActions = (
    <CardActions sx={{justifyContent: 'space-between'}}>
      {addButton}
      {clearButton}
    </CardActions>
  );

  const icon = isPending
    ? <CircularProgress size={24} />
    : <AttachmentOutlined color={error ? 'error' : undefined}/>;

  const formCard = (
    <FormCard
      title={props.label}
      subheader={selectedMessage}
      helperText={props.helperText}
      icon={icon}
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
