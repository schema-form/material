import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import {WidgetProps} from "@rjsf/utils";
import MonacoEditor, {MonacoEditorProps} from "../components/MonacoEditor";
import {mapControlProps} from "../utils/maps/mapControlProps";
import {SchemaFormContext} from "../SchemaForm";

export function mapEditorLanguage({ schema }: WidgetProps<any, any, SchemaFormContext>): MonacoEditorProps['language'] {
    switch (schema.contentMediaType) {
        case "text/plain": return "plaintext";
        case "application/json": return "json";
        case "text/x-apex-source":
        case "text/x-apex": return "apex";
        case "text/x-markdown": return "markdown";
        case "text/x-coffeescript":
        case "text/coffeescript": return "coffeescript";
        case "text/css": return "css";
        case "text/x-dart-source":
        case "text/x-dart": return "dart";
        case "application/graphql": return "graphql";
        case "text/x-handlebars-template": return "handlebars";
        case "text/html":
        case "text/x-jshtm":
        case "text/template":
        case "text/ng-template": return "html";
        case "text/x-java-source":
        case "text/x-java": return "java";
        case "text/javascript": return "javascript";
        case "text/x-kotlin-source":
        case "text/x-kotlin": return "kotlin";
        case "text/x-less":
        case "text/less": return "less";
        case "text/x-mips":
        case "text/mips":
        case "text/plaintext": return "mips";
        case "text/x-pascal-source":
        case "text/x-pascal": return "pascal";
        case "application/x-php": return "php";
        case "text/x-cshtml": return "razor";
        case "text/x-scala-source":
        case "text/x-scala":
        case "text/x-sbt":
        case "text/x-dotty": return "scala";
        case "text/x-scss":
        case "text/scss": return "scss";
        case "text/swift": return "swift";
        case "text/x-twig": return "twig";
        case "text/typescript": return "typescript";
        case "text/xml":
        case "application/xml":
        case "application/xaml+xml":
        case "application/xml-dtd": return "xml";
        case "application/x-yaml": return "yaml";
        default: return schema.contentMediaType?.match(/text\/(x-)?(.*)/)?.[2];
    }
}

export function mapEditorProps(props: WidgetProps<any, any, SchemaFormContext>): MonacoEditorProps {
    const { onChange } = props;
    const uiOptions = props?.options as MonacoEditorProps || {};
    const { height } = uiOptions;
    const commonProps = mapControlProps(props);

    return {
        ...commonProps,
        height: ['string', 'number'].includes(typeof height)
            ? height
            : '240px',
        language: mapEditorLanguage(props),
        loading: <CircularProgress />,
        theme: 'vs-dark',
        line: undefined,
        width: undefined,
        overrideServices: undefined,
        options: {
          ...uiOptions?.options
        },
        onChange: (value) => onChange(value)
    }
}

export default function EditorWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const editorProps = mapEditorProps(props);
    return <MonacoEditor {...editorProps} data-testid="EditorWidget" />;
}
