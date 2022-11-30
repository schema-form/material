import {WidgetProps} from "@rjsf/utils";
import EditorWidget, {mapEditorLanguage} from "./EditorWidget";
import TextFieldWidget from "./TextFieldWidget";
import MarkdownEditorWidget from "./MarkdownEditorWidget";
import SchemaEditorWidget from "./SchemaEditorWidget";
import {SchemaFormContext} from "../SchemaForm";

export default function TextWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const contentMediaType = props?.schema?.contentMediaType?.toLowerCase();

    switch (contentMediaType) {
      case 'application/schema+json': return SchemaEditorWidget(props);
      case 'text/x-markdown': return MarkdownEditorWidget(props);
      default: {
        const isEditor = mapEditorLanguage(props);
        return isEditor
          ? EditorWidget(props)
          : TextFieldWidget(props);
      }
    }
}
