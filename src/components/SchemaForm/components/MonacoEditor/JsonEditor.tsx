import React, {useEffect, useState} from "react";
import Editor, {EditorProps} from "@monaco-editor/react";
import Toolbar from "@mui/material/Toolbar";
import {
    Box,
    Breadcrumbs, Divider,
    FormHelperText,
    FormLabel, IconButton, List, ListItem,
    ListItemSecondaryAction,
    ListItemText,
    styled,
    TextFieldProps, Tooltip
} from "@mui/material";
import Card from "@mui/material/Card";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import {JSONSchema4, JSONSchema6, JSONSchema7} from "json-schema";
import {
    ChevronRightOutlined,
    ExploreOffOutlined,
    ExploreOutlined
} from "@mui/icons-material";
import {get} from "lodash";
import CopyButton from "../CopyButton";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";

export type JSONEditorProps = EditorProps & {
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
}

type StyledProps = {
    hasError: boolean;
}

const StyledCard = styled(Card)<StyledProps>(({ theme, hasError }) => ({
    transition: 'none',
    overflow: 'initial',
    padding: 1,
    borderColor: hasError
        ? theme.palette.error.main
        : theme.palette.action.disabled,
    '&:hover': {
        borderColor: hasError
            ? theme.palette.error.main
            : theme.palette.action.active
    },
    '&:focus-within': {
        borderColor: hasError
            ? theme.palette.error.main
            : theme.palette.action.active,
        borderWidth: 2,
        padding: 0
    }
}))

const Content = styled('div')(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    borderColor: theme.palette.divider,
    borderWidth: '1px 0 1px 0',
    borderStyle: 'solid',
    '&:first-child': {
        borderTopWidth: 0
    },
    '&:last-child': {
        borderBottomWidth: 0
    }
}))

const Footer = styled('footer')(({ theme }) => ({
    padding: theme.spacing(1, 2)
}))

const ToolbarActions = styled('aside')(({ theme }) => ({
    marginLeft: 'auto',
    display: 'flex',
    '& > button': {
        marginLeft: theme.spacing(.5)
    }
}))

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
    marginTop: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
}))


const BreadcrumbItem = styled('div')(({ theme }) => ({
    fontSize: 13,
    minHeight: 24,
    display: 'flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    color: theme.palette.info.main,
    cursor: 'pointer'
}))

const StyledBreadcrumbs = styled(Breadcrumbs)(({ theme }) => ({
    padding: theme.spacing(.5, 2),
    overflow: 'auto',
    '& > ol': {
        flexWrap: 'nowrap'
    }
}))

const StyledListItemText = styled(ListItemText)(({ theme }) => ({
    display: 'grid',
    gridTemplateColumns: '1fr 2fr',
    gridGap: theme.spacing(2)
}))


type JSONViewBreadcrumbsProps = {
    pathSegments: string[];
    onSelect: (nextPathSegments: string[]) => void;
}

function JSONViewBreadcrumbs({ pathSegments = [], onSelect }: JSONViewBreadcrumbsProps) {
    const renderItem = (pathSegment: string, index = -1) => {
        const isLast = index === (pathSegments.length - 1);

        if (isLast) {
            return (
                <BreadcrumbItem>
                    {pathSegment}
                </BreadcrumbItem>
            );
        }

        return (
            <BreadcrumbItem
                key={index}
                onClick={() => onSelect(pathSegments.slice(0, index + 1))}
            >
                {pathSegment}
            </BreadcrumbItem>
        )
    }

    return (
        <StyledBreadcrumbs separator='›' maxItems={99}>
            {renderItem('root')}
            {pathSegments?.map(renderItem)}
        </StyledBreadcrumbs>
    )
}

export type PropertyListProps = {
    json: any;
    onNavigate: (key: string) => void;
}

function PropertyList({ json, onNavigate }: PropertyListProps) {
    const entries = Object.entries(json);
    const renderItem = ([key, value]: [string, any], index: number) => {
        const notLast = index < (entries.length - 1);
        const isObject = typeof value === 'object';
        const keysNumber = isObject && Object.keys(value).length;
        const handleNext = isObject
            ? () => onNavigate(key)
            : () => null;

        const nextButton = isObject && (
            <IconButton size="small" onClick={handleNext}>
                <ChevronRightOutlined fontSize="small" />
            </IconButton>
        )

        return (
            <ListItem
                key={key} dense
                button={isObject as false}
                divider={notLast as false}
                onClick={handleNext}
            >
                <StyledListItemText
                    primary={key}
                    secondary={isObject ? `[${keysNumber} props]` : String(value)}
                />
                <ListItemSecondaryAction>
                    {nextButton}
                </ListItemSecondaryAction>
            </ListItem>
        )
    }

    return (
        <List disablePadding={true}>
            {entries.map(renderItem)}
        </List>
    )
}

const parseJSON = (rootJSON = '', pathSegments: string[]) => {
    try {
        const parsedRootJSON = JSON.parse(rootJSON);
        const hasPathSegments = pathSegments.length > 0;
        const parsedPathJSON = hasPathSegments
            ? get(parsedRootJSON, pathSegments)
            : parsedRootJSON;
        const pathJSON = JSON.stringify(parsedPathJSON, null, 2);
        return {
            parsedRoot: parsedRootJSON,
            parsedPath: parsedPathJSON,
            sourceRoot: rootJSON,
            sourcePath: pathJSON,
        }
    } catch (error) {
        return {
            parsedRoot: undefined,
            parsedPath: undefined,
            sourceRoot: rootJSON,
            sourcePath: undefined,
        }
    }
}

export function JsonEditor(props: JSONEditorProps) {
    const { value, error, disabled, className, helperText, label, schema, onChange, ...editorProps } = props;
    const { theme } = useMonacoEditorTheme();
    const hasError = Boolean(error);

    const [isEnabledEditor, setEnabledEditor] = useState(true);
    const [pathSegments, setPathSegments] = useState<string[]>([]);
    const [json, setJSON] = useState<any>({
        sourceRoot: value,
        sourcePath: value,
        parsedRoot: undefined,
        parsedPath: undefined,
    });
    const hasPathSegments = pathSegments.length > 0;
    const isObject = typeof json.parsedPath === 'object';

    useEffect(() => {
        const json = parseJSON(value, pathSegments);
        setJSON(json);
    }, [value])

    const navigateTo = (pathSegments: string[]) => {
        const json = parseJSON(value, pathSegments);
        setJSON(json);
        setPathSegments(pathSegments);
    }

    const toggleEditor = () => {
        const json = parseJSON(value, pathSegments);
        setJSON(json);
        setEnabledEditor(!isEnabledEditor);
    }

    const breadcrumbs = hasPathSegments && (
        <Box sx={{mt: 'auto'}}>
            <Divider />
            <JSONViewBreadcrumbs
                pathSegments={pathSegments}
                onSelect={navigateTo}
            />
        </Box>
    )

    const propertyList = !isEnabledEditor && (
        <PropertyList
            json={json?.parsedPath}
            onNavigate={(key) => navigateTo([...pathSegments, key])}
        />
    )

    const copyButton = (
        <CopyButton
            size='small'
            copyContent={value}
        />
    );

    const editorThemeToggle = isEnabledEditor && (
        <MonacoEditorThemeToggle
            size='small'
        />
    );

    const editorIcon = isEnabledEditor
        ? <ExploreOutlined fontSize='small' />
        : <ExploreOffOutlined fontSize='small'/>;
    const editorToggle = isObject && (
        <Tooltip title={isEnabledEditor ? 'Switch to navigator' : 'Switch to code'}>
            <IconButton size='small' onClick={toggleEditor}>
                {editorIcon}
            </IconButton>
        </Tooltip>
    )

    const formLabel = label && (
        <FormLabel
            children={label}
            disabled={disabled}
            error={error}
        />
    )

    const header = (
        <Toolbar variant="dense" sx={{ px: 2 }}>
            {formLabel}
            <ToolbarActions>
                {editorThemeToggle}
                {editorToggle}
                {copyButton}
            </ToolbarActions>
        </Toolbar>
    )

    const footer = helperText && (
        <Footer>
            <StyledFormHelperText
                error={error}
                disabled={disabled}
                children={helperText}
            />
        </Footer>
    )

    const editor = isEnabledEditor && (
        <Editor
            {...editorProps}
            value={value}
            // value={json.sourcePath}
            // onChange={(value, ev) => {
            //     if (!value) {
            //         onChange?.(value, ev);
            //         return;
            //     }
            //
            //     const parsedPath = JSON.parse(value)
            //     const nextParsedJSON = hasPathSegments
            //         ? set(json?.parsedRoot, pathSegments, parsedPath)
            //         : parsedPath;
            //     const nextJSON = JSON.stringify(nextParsedJSON, null, 2);
            //     onChange?.(nextJSON, ev);
            // }}
            theme={theme}
            options={{
                minimap: {
                    enabled: false
                },
                ...editorProps.options,
                readOnly: disabled,
            }}
            beforeMount={(monaco) => {
                if (schema) {
                    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                        validate: true,
                        schemas: [
                            {
                                uri: 'http://json-schema.org/draft-07/schema',
                                fileMatch: ['*'],
                                schema
                            }
                        ]
                    });
                }
            }}
        />
    );

    const content = (
        <Content sx={{
            minHeight: editorProps.height,
            maxHeight: editorProps.height
        }}>
            {editor || propertyList}
            {breadcrumbs}
        </Content>
    )

    return (
        <StyledCard
            hasError={hasError}
            className={className}
            variant="outlined"
        >
            {header}
            {content}
            {footer}
        </StyledCard>
    )
}

export default JsonEditor;
