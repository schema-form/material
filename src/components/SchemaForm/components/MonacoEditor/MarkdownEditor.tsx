import React, {FunctionComponent, useState} from "react";
import Editor, {EditorProps} from "@monaco-editor/react";
import {
    Box,
    CardActions, Container,
    Stack,
    TextFieldProps, Tooltip
} from "@mui/material";
import {
  AssignmentTurnedInOutlined,
  CodeOutlined,
  FormatBoldOutlined,
  FormatItalicOutlined,
  FormatListBulletedOutlined,
  FormatListNumberedOutlined,
  FormatQuoteOutlined,
  InsertLinkOutlined,
  InsertPhotoOutlined,
  TitleOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined
} from "@mui/icons-material";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import CopyButton from "../CopyButton";
import {Markdown} from "../Markdown";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";
import IconButton from "@mui/material/IconButton";
import FormCard from "../FormCard";

export type MarkdownEditorProps = EditorProps & {
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
}

type InsertAction = {
    title: string;
    Icon: FunctionComponent<any>;
    insertCode: string;
}

const insertActions: InsertAction[] = [
    {
        title: 'Title',
        Icon: TitleOutlined,
        insertCode: '## Heading 2\n'
    },
    {
        title: 'Bold',
        Icon: FormatBoldOutlined,
        insertCode: '**Bold**'
    },
    {
        title: 'Italic',
        Icon: FormatItalicOutlined,
        insertCode: '*Italic*'
    },
    {
        title: 'Quote',
        Icon: FormatQuoteOutlined,
        insertCode: '> Blockquote\n'
    },
    {
        title: 'Code',
        Icon: CodeOutlined,
        insertCode: '`Inline code` with backticks\n'
    },
    {
        title: 'Link',
        Icon: InsertLinkOutlined,
        insertCode: '[Link](http://a.com)'
    },
    {
        title: 'Image',
        Icon: InsertPhotoOutlined,
        insertCode: '![Image](http://url/a.png)\n'
    },
    {
        title: 'Bulleted list',
        Icon: FormatListBulletedOutlined,
        insertCode:
            '* List\n' +
            '* List\n' +
            '* List\n'
    },
    {
        title: 'Numbered list',
        Icon: FormatListNumberedOutlined,
        insertCode:
            '1. One\n' +
            '2. Two\n' +
            '3. Three\n'
    },
    {
        title: 'Task list',
        Icon: AssignmentTurnedInOutlined,
        insertCode:
            '- [ ] One\n' +
            '- [ ] Two\n' +
            '- [x] Three (completed)\n'
    }
]

export function MarkdownEditor(props: MarkdownEditorProps) {
    const { value, error, disabled, className, helperText, label, ...editorProps } = props;
    const hasError = Boolean(error);
    const [showPreview, setShowPreview] = useState(false);
    const [monacoEditor, setMonacoEditor] = useState<any>(null);
    const { theme } = useMonacoEditorTheme();
    const togglePreview = () => setShowPreview(!showPreview);

    const createInsertHandle = (insertCode: InsertAction['insertCode']) => () => {
        if (monacoEditor) {
            monacoEditor.executeEdits("my-source", [{
                identifier: { major: 1, minor: 1 },
                range: monacoEditor.getSelection(),
                text: insertCode,
                forceMoveMarkers: true
            }]);
        }
    }

    const renderInsertAction = (item: InsertAction) => (
        <Tooltip key={item?.title} title={item.title} placement="top">
            <IconButton
                size="small"
                onClick={createInsertHandle(item.insertCode)}
            >
                <item.Icon fontSize="small" />
            </IconButton>
        </Tooltip>
    )

    const insertActionsFooter = (
        <CardActions>
            {insertActions.map(renderInsertAction)}
        </CardActions>
    );

    const PreviewIcon = showPreview ? VisibilityOffOutlined : VisibilityOutlined;
    const previewAction = (
        <Tooltip title={showPreview ? 'Hide preview' : 'Show preview'}>
            <IconButton
                size='small'
                onClick={togglePreview}
            >
                <PreviewIcon fontSize="small" />
            </IconButton>
        </Tooltip>
    )

    const editorThemeToggle = (
        <MonacoEditorThemeToggle
            size='small'
        />
    );

    const copyIconButton = (
        <CopyButton
            size='small'
            edge='end'
            copyContent={value}
        />
    );

    const toolbarActions = (
        <Stack direction="row" alignItems="center" spacing={.5}>
            {previewAction}
            {editorThemeToggle}
            {copyIconButton}
        </Stack>
    );

    const editor = (
        <Box sx={{flex: 1, minWidth: '50%'}}>
            <Editor
                {...editorProps}
                value={value}
                theme={theme}
                onMount={setMonacoEditor}
                options={{
                    minimap: {
                        enabled: false
                    },
                    ...editorProps.options,
                    readOnly: disabled,
                }}
            />
        </Box>
    );

    const preview = showPreview ? (
        <Container sx={{
            borderLeftWidth: 1,
            borderLeftStyle: 'solid',
            overflow: 'auto',
            flex: 1,
            minWidth: '50%',
            height: props.height || 240,
            borderLeftColor: theme => theme.palette.divider
        }}>
            <Markdown>
                {value || ''}
            </Markdown>
        </Container>
    ) : null;

    return (
        <FormCard
            isControl={true}
            error={hasError}
            disabled={disabled}
            label={label}
            helperText={helperText}
            secondaryAction={toolbarActions}
        >
            <Stack direction="row">
                {editor}
                {preview}
            </Stack>
            {insertActionsFooter}
        </FormCard>
    )
}

export default MarkdownEditor;
