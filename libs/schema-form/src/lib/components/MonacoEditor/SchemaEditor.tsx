import React, {useMemo, useState} from "react";
import {v4 as uuid} from "uuid";
import Editor, {EditorProps} from "@monaco-editor/react";
import {
    Box,
    Stack,
    TextFieldProps, Tooltip
} from "@mui/material";
import {
  MenuOpenOutlined
} from "@mui/icons-material";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import CopyIconButton from "../CopyIconButton";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";
import IconButton from "@mui/material/IconButton";
import FormCard from "../FormCard";
import {JSONSchema7} from "json-schema";

export type SchemaEditorProps = Omit<EditorProps, 'language' | 'defaultLanguage'> & {
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
}

export function parseSchema(schema: string): JSONSchema7 | undefined {
  try {
    return schema ? JSON.parse(schema) : undefined;
  } catch (error) {
    console.error(error);
    return;
  }
}

export function SchemaEditor(props: SchemaEditorProps) {
    const { value, error, disabled, className, helperText, label, ...editorProps } = props;
    const hasError = Boolean(error);
    const [showTestEditor, setShowTestEditor] = useState(false);
    const [schema, setSchema] = useState(value);
    const [data, setData] = useState<string | undefined>('');
    const { theme } = useMonacoEditorTheme();
    const schemaId = useMemo(uuid, [schema]);
    const togglePreview = () => setShowTestEditor(!showTestEditor);

    const testEditorToggleTooltip = showTestEditor ? 'Hide preview' : 'Show preview';
    const testEditorToggle = (
        <Tooltip title={testEditorToggleTooltip}>
            <IconButton
                size='small'
                onClick={togglePreview}
                sx={{ml: 'auto!important'}}
                color={showTestEditor ? 'primary' : undefined}
            >
                <MenuOpenOutlined
                  fontSize="small"
                  sx={{transform: showTestEditor ? 'rotate(180deg)' : undefined}}
                />
            </IconButton>
        </Tooltip>
    );

    const editorThemeToggle = (
        <MonacoEditorThemeToggle
            size='small'
        />
    );

    const copyIconButton = (
        <CopyIconButton
            size='small'
            edge='end'
            copyContent={value}
        />
    );

    const editor = (
        <Box sx={{flex: 1, minWidth: '50%'}}>
            <Editor
                {...editorProps}
                language='json'
                value={value}
                theme={theme}
                options={{
                    minimap: {
                        enabled: false
                    },
                    ...editorProps.options,
                    readOnly: disabled,
                }}
                onChange={(value, ev) => {
                  setSchema(value);
                  editorProps?.onChange?.(value, ev);
                }}
            />
        </Box>
    );

    const testEditor = showTestEditor ? (
      <Box sx={{flex: 1, minWidth: '50%'}}>
          <Editor
            key={schemaId}
            language='json'
            value={data}
            onChange={setData}
            path={schemaId}
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
                const parsedSchema = parseSchema(schema);

                monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                  validate: true,
                  schemaValidation: 'error',
                  schemas: [
                    {
                      uri: `http://myserver/${schemaId}`,
                      fileMatch: [schemaId],
                      schema: parsedSchema
                    }
                  ]
                });
              }
            }}
          />
      </Box>
    ) : null;

    const expandedActions = (
      <Stack direction="row" spacing={.5}>
        {testEditorToggle}
        {editorThemeToggle}
      </Stack>
    );

    return (
        <FormCard
            isControl={true}
            error={hasError}
            disabled={disabled}
            title={label}
            helperText={helperText}
            expandedActions={expandedActions}
            permanentActions={copyIconButton}
        >
            <Stack direction="row">
                {editor}
                {testEditor}
            </Stack>
        </FormCard>
    )
}

export default SchemaEditor;
