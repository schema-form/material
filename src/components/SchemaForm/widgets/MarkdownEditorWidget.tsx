import React from "react";
import {WidgetProps} from "@rjsf/utils";
import {MarkdownEditor} from "../components/MonacoEditor";
import {mapEditorProps} from "./EditorWidget";
import {SchemaFormContext} from "../SchemaForm";

export default function MarkdownEditorWidget(props: WidgetProps<any, SchemaFormContext>) {
    const editorProps = mapEditorProps(props);
    return <MarkdownEditor {...editorProps} data-testid="MarkdownEditorWidget" />;
}
