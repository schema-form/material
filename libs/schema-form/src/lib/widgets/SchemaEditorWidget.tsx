import React, {useMemo, useState} from "react";
import {WidgetProps} from "@rjsf/utils";
import {Grid, Stack} from "@mui/material";
import {mapEditorProps} from "./EditorWidget";
import MonacoEditor from "../components/MonacoEditor";
import {JSONSchema7} from "json-schema";
import {SchemaFormContext} from "../SchemaForm";

export function parseSchema(schema: string): JSONSchema7 {
  try {
    return JSON.parse(schema || '{}');
  } catch (error) {
    console.error(error);
    return {};
  }
}

export default function SchemaEditorWidget(props: WidgetProps<any, any, SchemaFormContext>) {
  const [data, setData] = useState<string | undefined>('');
  const { value: schema } = props;
  const editorProps = mapEditorProps(props);
  const parsedSchema = useMemo(() => parseSchema(schema), [schema]);

  return (
    <Stack spacing={2} data-testid="SchemaEditorWidget">
      <MonacoEditor
        {...editorProps as any}
        language='json'
        path='schema'
        label='JSON schema'
        helperText='Represents validation schema'
      />
      <MonacoEditor
        {...editorProps as any}
        language='json'
        path='data'
        value={data}
        schema={parsedSchema}
        onChange={(data, ev) => setData(data)}
        label='Test data (JSON)'
        helperText='Represents data for validation'
      />
    </Stack>
  );
}
