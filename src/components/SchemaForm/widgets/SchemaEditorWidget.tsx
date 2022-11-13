import React, {useMemo, useState} from "react";
import {WidgetProps} from "@rjsf/utils";
import {Grid, styled} from "@mui/material";
import {mapEditorProps} from "./EditorWidget";
import MonacoEditor, {MonacoEditorProps} from "../components/MonacoEditor";
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

const SchemaEditor = styled(MonacoEditor)<MonacoEditorProps>(({ theme }) => ({
  position: 'relative',
  borderTopRightRadius: 0,
  borderBottomRightRadius: 0,
  '&:hover, &:focus-within': {
    zIndex: 1
  }
}));

const DataEditor = styled(MonacoEditor)<MonacoEditorProps>(({ theme }) => ({
  position: 'relative',
  borderTopLeftRadius: 0,
  borderBottomLeftRadius: 0,
  marginLeft: -1,
  '&:hover, &:focus-within': {
    zIndex: 1
  }
}));

export default function SchemaEditorWidget(props: WidgetProps<any, SchemaFormContext>) {
  const [data, setData] = useState<string | undefined>('');
  const { value: schema } = props;
  const editorProps = mapEditorProps(props);
  const parsedSchema = useMemo(() => parseSchema(schema), [schema]);

  return (
    <Grid container data-testid="SchemaEditorWidget">
      <Grid item sm={6}>
        <SchemaEditor
          {...editorProps as any}
          height={360}
          language='json'
          path='schema'
          label='JSON schema'
          helperText='Represents validation schema'
        />
      </Grid>
      <Grid item sm={6}>
        <DataEditor
          {...editorProps as any}
          height={360}
          language='json'
          path='data'
          value={data}
          schema={parsedSchema}
          onChange={(data, ev) => setData(data)}
          label='Test data (JSON)'
          helperText='Represents data for validation'
        />
      </Grid>
    </Grid>
  );
}
