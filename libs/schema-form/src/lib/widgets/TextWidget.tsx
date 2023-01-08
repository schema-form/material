import {WidgetProps} from "@rjsf/utils";
import EditorWidget, {mapEditorLanguage} from "./EditorWidget";
import TextFieldWidget from "./TextFieldWidget";
import MarkdownEditorWidget from "./MarkdownEditorWidget";
import SchemaEditorWidget from "./SchemaEditorWidget";
import {SchemaFormContext} from "../SchemaForm";
import TimePickerWidget from "./TimePickerWidget";
import DateTimePickerWidget from "./DateTimePickerWidget";
import DatePickerWidget from "./DatePickerWidget";
import PasswordFieldWidget from "./PasswordFieldWidget";
import ColorFieldWidget from "./ColorFieldWidget";

export default function TextWidget(props: WidgetProps<any, any, SchemaFormContext>) {
    const contentMediaType = props?.schema?.contentMediaType?.toLowerCase();
    const format = props?.schema?.format?.toLowerCase();

    switch (format) {
      case 'time': return TimePickerWidget(props);
      case 'date': return DatePickerWidget(props);
      case 'date-time': return DateTimePickerWidget(props);
      case 'password': return PasswordFieldWidget(props);
      case 'color': return ColorFieldWidget(props);
      case 'text': return EditorWidget(props);
      case 'markdown': return MarkdownEditorWidget(props);
      case 'schema': return SchemaEditorWidget(props);
    }

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
