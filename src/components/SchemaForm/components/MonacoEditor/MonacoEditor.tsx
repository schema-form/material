import React, { useMemo, useState } from "react";
import Editor, {EditorProps} from "@monaco-editor/react";
import {
    Stack,
    TextFieldProps
} from "@mui/material";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import {JSONSchema4, JSONSchema6, JSONSchema7} from "json-schema";
import CopyButton from "../CopyButton";
import {useMonacoEditorTheme} from "./MonacoEditorThemeProvider";
import FormCard from "../FormCard";

export type MonacoEditorProps = EditorProps & {
    error?: TextFieldProps['error'];
    disabled?: TextFieldProps['disabled'];
    label?: TextFieldProps['label'];
    helperText?: TextFieldProps['helperText'];
    schema?: JSONSchema4 | JSONSchema6 | JSONSchema7;
    path?: string;
}

export function MonacoEditor(props: MonacoEditorProps) {
    const { value, error, disabled, className, helperText, label, schema, path, options, ...editorProps } = props;
    const { theme } = useMonacoEditorTheme();
    const hasValidationError = Boolean(error);
    const [errorMarkers, setErrorMarkers] = useState<any>([]);
    const hasMarkersError = Boolean(errorMarkers?.length);
    const hasError = hasValidationError || hasMarkersError;
    const errorMessage = errorMarkers?.[0]?.message;
    const key = useMemo(() => Math.random().toString(16), [schema]);

    const copyIconButton = (
        <CopyButton
            size='small'
            edge='end'
            copyContent={value}
        />
    );

    const editorThemeToggle = (
        <MonacoEditorThemeToggle
            size='small'
        />
    );

    const actions = (
        <Stack direction="row" spacing={.5}>
            {editorThemeToggle}
            {copyIconButton}
        </Stack>
    )

    const editor = (
        <Editor
            {...editorProps}
            key={key}
            value={value}
            theme={theme}
            options={{
                minimap: {
                    enabled: false,
                    ...options?.minimap
                },
                ...options,
                readOnly: disabled,
            }}
            path={path}
            onValidate={(markers) => {
                props?.onValidate?.(markers);
                setErrorMarkers(markers);
            }}
            beforeMount={(monaco) => {
                if (schema) {
                    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                        validate: true,
                        schemaValidation: 'error',
                        schemas: [
                            {
                                uri: `http://myserver/${path}`,
                                fileMatch: path ? [path] : [],
                                schema
                            }
                        ]
                    });
                }
            }}
        />
    )

    return (
        <FormCard
            isControl={true}
            error={hasError}
            disabled={disabled}
            label={label}
            helperText={errorMessage || helperText}
            secondaryAction={actions}
        >
            {editor}
        </FormCard>
    )
}

export default MonacoEditor;
