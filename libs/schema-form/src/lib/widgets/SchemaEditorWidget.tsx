import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {mapEditorProps} from "./EditorWidget";
import {SchemaFormContext} from "../SchemaForm";
import SchemaEditor from "../components/MonacoEditor/SchemaEditor";

export default function SchemaEditorWidget(props: WidgetProps<any, any, SchemaFormContext>) {
  const editorProps = mapEditorProps(props);
  return <SchemaEditor {...editorProps} data-testid="SchemaEditorWidget" />;
}
