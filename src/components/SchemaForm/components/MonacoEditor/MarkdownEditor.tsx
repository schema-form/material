import React, {FunctionComponent, useState} from "react";
import Editor, {EditorProps} from "@monaco-editor/react";
import Toolbar, {ToolbarProps} from "@mui/material/Toolbar";
import {
  Button,
  Divider,
  FormHelperText, Stack, styled, TabsProps,
  TextFieldProps, Tooltip
} from "@mui/material";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
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
  TitleOutlined
} from "@mui/icons-material";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import CopyButton from "../CopyButton";
import {Markdown} from "../Markdown";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";

export type MarkdownEditorProps = EditorProps & {
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
}

type StyledProps = {
    hasError: boolean;
}

const StyledCard = styled(Card)<StyledProps>(({ theme, hasError }) => ({
  transition: 'none',
  padding: 1,
  borderColor: hasError
    ? theme.palette.error.main
    : theme.palette.grey["400"],
  '&:hover': {
    borderColor: hasError
      ? theme.palette.error.main
      : theme.palette.grey["900"]
  },
  '&:focus-within': {
    borderColor: hasError
      ? theme.palette.error.main
      : theme.palette.grey["900"],
    borderWidth: 2,
    padding: 0
  }
}));

const Footer = styled('footer')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2)
}))

const Content = styled('div')(({ theme }) => ({
    overflow: 'auto',
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

const StyledToolbar = styled(Toolbar)<ToolbarProps>(({ theme }) => ({
    paddingRight: theme.spacing(1),
    borderBottom: `1px solid ${theme.palette.divider}`,
    overflow: 'auto'
}))

const StyledTabs = styled(Tabs)<TabsProps>(({ theme }) => ({
    overflow: 'initial'
}))

const StyledFormHelperText = styled(FormHelperText)(({ theme }) => ({
    marginTop: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    WebkitLineClamp: 2,
    WebkitBoxOrient: 'vertical'
}))

const Actions = styled('aside')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    marginLeft: 'auto',
    boxShadow: 'rgba(0,0,0) -5px 0 -16px inset'
}))

const Action = styled(Button)(({ theme }) => ({
  minWidth: 'auto'
}))

export enum MarkdownEditorTab {
    EDITOR,
    PREVIEW
}

type InsertAction = {
    title: string;
    Icon: FunctionComponent<any>;
    insert: string;
}

const insertActions: InsertAction[] = [
    {
        title: 'Title',
        Icon: TitleOutlined,
        insert: '## Heading 2'
    },
    {
        title: 'Bold',
        Icon: FormatBoldOutlined,
        insert: '**Bold**'
    },
    {
        title: 'Italic',
        Icon: FormatItalicOutlined,
        insert: '*Italic*'
    },
    {
        title: 'Quote',
        Icon: FormatQuoteOutlined,
        insert: '> Blockquote'
    },
    {
        title: 'Code',
        Icon: CodeOutlined,
        insert: '`Inline code` with backticks'
    },
    {
        title: 'Link',
        Icon: InsertLinkOutlined,
        insert: '[Link](http://a.com)'
    },
    {
        title: 'Image',
        Icon: InsertPhotoOutlined,
        insert: '![Image](http://url/a.png)'
    },
    {
        title: 'Bulleted list',
        Icon: FormatListBulletedOutlined,
        insert:
            '* List\n' +
            '* List\n' +
            '* List'
    },
    {
        title: 'Numbered list',
        Icon: FormatListNumberedOutlined,
        insert:
            '1. One\n' +
            '2. Two\n' +
            '3. Three'
    },
    {
        title: 'Task list',
        Icon: AssignmentTurnedInOutlined,
        insert:
            '- [ ] One\n' +
            '- [ ] Two\n' +
            '- [x] Three (completed)'
    }
]

type InsertsMenuProps = {
    onItemSelect?: (insert: string) => void;
}

function InsertsActions({ onItemSelect }: InsertsMenuProps) {
    return (
      <Stack direction="row">
        {insertActions.map(({ Icon, insert, title }, index) => (
          <Tooltip key={title} title={title}>
            <Action
              variant="text"
              size="small"
              onClick={() => onItemSelect?.(insert)}
            >
              <Icon fontSize="small" />
            </Action>
          </Tooltip>
        ))}
      </Stack>
    );
}


export function MarkdownEditor(props: MarkdownEditorProps) {
    const { value, error, disabled, className, helperText, label, ...editorProps } = props;
    const hasError = Boolean(error);
    const [activeTab, setActiveTab] = useState(MarkdownEditorTab.EDITOR);
    const [monacoEditor, setMonacoEditor] = useState<any>(null);
    const edited = activeTab === MarkdownEditorTab.EDITOR;
    const { theme } = useMonacoEditorTheme();

    const tabs = (
        <StyledTabs
            variant='fullWidth'
            disabled={disabled}
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
        >
            <Tab
                value={MarkdownEditorTab.EDITOR}
                label='Write'
            />
            <Tab
                value={MarkdownEditorTab.PREVIEW}
                label='Preview'
            />
        </StyledTabs>
    )

    const actions = edited && (
        <Actions>
            <InsertsActions
              onItemSelect={(insert) => {
                if (monacoEditor) {
                  monacoEditor.executeEdits("my-source", [{
                    identifier: { major: 1, minor: 1 },
                    range: monacoEditor.getSelection(),
                    text: insert,
                    forceMoveMarkers: true
                  }]);
                }
              }}
            />
            <Divider
                sx={{mx: 1}}
                orientation="vertical"
                flexItem
            />
            <MonacoEditorThemeToggle
              size="small"
            />
            <CopyButton
              size="small"
              copyContent={value}
            />
        </Actions>
    )

    const toolbar = (
      <StyledToolbar variant="dense" disableGutters={true}>
        {tabs}
        {actions}
      </StyledToolbar>
    )


    const editor = edited && (
        <Content>
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
        </Content>
    )

    const preview = !edited && (
        <Content sx={{p: 2}} style={{ height: editorProps?.height }}>
            <Markdown>
                {value || ''}
            </Markdown>
        </Content>
    )

    const footer = (error || helperText) && (
        <Footer>
            <StyledFormHelperText
                error={error}
                disabled={disabled}
                children={helperText}
            />
        </Footer>
    )

    return (
        <StyledCard
            hasError={hasError}
            className={className}
            variant="outlined"
        >
            {toolbar}
            {editor}
            {preview}
            {footer}
        </StyledCard>
    )
}

export default MarkdownEditor;
