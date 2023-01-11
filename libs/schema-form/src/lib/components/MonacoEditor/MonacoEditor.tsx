import React, { useMemo, useState } from "react";
import Editor, {EditorProps} from "@monaco-editor/react";
import {
    Stack,
    TextFieldProps
} from "@mui/material";
import {MonacoEditorThemeToggle} from "./MonacoEditorThemeToggle";
import {JSONSchema4, JSONSchema6, JSONSchema7} from "json-schema";
import CopyIconButton from "../CopyIconButton";
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
        <CopyIconButton
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

    const editor = (
      <div style={{opacity: props.disabled ? .38 : 1}}>
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
      </div>
    )

    return (
        <FormCard
            isControl={true}
            error={hasError}
            disabled={disabled}
            title={label}
            helperText={errorMessage ?? helperText}
            expandedActions={editorThemeToggle}
            permanentActions={copyIconButton}
        >
            {editor}
        </FormCard>
    )
}

export default MonacoEditor;
